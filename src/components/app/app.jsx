import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';

import { getIngredients, clearIngredientInfo } from '../../services/redux/actions/ingredientsActions';
import { addIngredient, clearBurgerConstructor } from '../../services/redux/actions/constructorActions';
import { wsClearOrderDetails } from '../../services/redux/actions/wsAllOrdersActions';
import { clearOrderResult, clearOrderError } from '../../services/redux/actions/orderActions';
import { closeModal } from '../../services/redux/actions/modalActions';

import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredients-details/ingredient-details';
import OrderResult from '../order-result/order-result';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import ProtectedRoute from '../protected-route/protected-route';

import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import FeedPage from '../../pages/feed-page/feed-page';
import FeedOrderPage from '../../pages/feed-order-page/feed-order-page';
import IngredientPage from '../../pages/ingredient-page/ingredient-page';
import NotFound404 from '../../pages/not-found-404/not-found-404';

import styles from './app.module.css';

const App = () => {
	const { ingredients, ingredientInfo } = useSelector(state => state.ingredients);
	const { orderResult } = useSelector(state => state.order);
	const { orderDetails } = useSelector(state => state.wsAllOrders);
	const { modalIsOpen, modalMode } = useSelector (state => state.modal);

	const history = useHistory();
	const location = useLocation();
	const background = history.action === 'PUSH' && location.state && location.state.background;

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getIngredients());
    }, [dispatch]);

	const handleDrop = item => {
		const filteredIngredient = ingredients.filter(
			ingredient => ingredient._id === item.id,
		)[0];

		const ingredientData = {
			uniqueId: item.id = nanoid(),
			data: filteredIngredient,
		};

		dispatch(addIngredient(ingredientData));
    };

	return (
		<>
			<AppHeader />
			<Switch location={background || location}>
				<Route exact path="/">
					<main className={styles.main}>
						<DndProvider backend={HTML5Backend}>
							<BurgerIngredients />
							<BurgerConstructor onDropHandler={handleDrop} />
						</DndProvider>
					</main>
				</Route>
				<Route path="/login">
					<LoginPage />
				</Route>
				<Route path="/register">
					<RegisterPage />
				</Route>
				<Route path="/forgot-password">
					<ForgotPasswordPage />
				</Route>
				<Route path="/reset-password">
					<ResetPasswordPage />
				</Route>
				<ProtectedRoute exact path="/profile">
					<ProfilePage />
				</ProtectedRoute>
				<ProtectedRoute exact path="/profile/orders">
					<ProfilePage />
				</ProtectedRoute>
				<ProtectedRoute path="/profile/orders/:id">
					<FeedOrderPage />
				</ProtectedRoute>
				<Route exact path="/feed">
					<FeedPage />
				</Route>
				<Route path='/feed/:id'>
					<FeedOrderPage />
				</Route>
				<Route path='/ingredients/:id'>
					<IngredientPage />
				</Route>
				<Route>
					<NotFound404 />
				</Route>
			</Switch>
			{
				background && modalMode === 'ingredient-details' ? (
					<Route path='/ingredients/:id'>
						<Modal
							title="Детали ингредиента"
							onClose={() => {
								dispatch(clearIngredientInfo());
								dispatch(closeModal());
								history.goBack();
							}}
						>
							<IngredientDetails ingredientInfo={ingredientInfo} />
						</Modal>
					</Route>
				) : null
			}
			{
				background && modalMode === 'order-details' ? (
					<Route path={["/feed/:id", "/profile/orders/:id"]}>
						<Modal
							onClose={() => {
								dispatch(wsClearOrderDetails());
								dispatch(closeModal());
								history.goBack();
							}}
						>
							<OrderDetails orderDetails={orderDetails} />
						</Modal>
					</Route>
				) : null
			}
			{
				modalIsOpen && modalMode === 'order-result' ? (
					<Modal onClose={() => {
						if (orderResult.success) {
							dispatch(clearBurgerConstructor());
							dispatch(clearOrderResult());
						}
						dispatch(clearOrderError());
						dispatch(closeModal());
					}}>
						<OrderResult />
					</Modal>
				) : null
			}
		</>
	);
};

export default App;
