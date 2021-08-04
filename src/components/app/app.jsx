import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getIngredients, clearIngredientInfo } from '../../services/actions/ingredientsActions';
import { addIngredient, clearBurgerConstructor } from '../../services/actions/constructorActions';
import { clearOrderDetails, clearOrderError } from '../../services/actions/orderActions';
import { closeModal } from '../../services/actions/modalActions';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredients-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import LoginPage from '../../pages/login-page/login-page';
import RegisterPage from '../../pages/register-page/register-page';
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page';
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page';
import ProfilePage from '../../pages/profile-page/profile-page';
import NotFound404 from '../../pages/not-found-404/not-found-404';
import styles from './app.module.css';

const App = () => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector(state => state.ingredients);
	const { orderResult } = useSelector(state => state.order);
	const { modalIsOpen, modalMode } = useSelector (state => state.modal);

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
			<Router>
				<Switch>
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
					<Route path="/profile">
						<ProfilePage />
					</Route>
					<Route>
						<NotFound404 />
					</Route>
				</Switch>
			</Router>
			{
				modalIsOpen && modalMode === 'ingredient-details' ? (
					<Modal
						title="Детали ингредиента"
						onClose={() => {
							dispatch(clearIngredientInfo());
							dispatch(closeModal());
						}}
					>
						<IngredientDetails />
					</Modal>
				) : null
			}
			{
				modalIsOpen && modalMode === 'order-details' ? (
					<Modal onClose={() => {
						if (orderResult.success) {
							dispatch(clearBurgerConstructor());
							dispatch(clearOrderDetails());
						}
						dispatch(clearOrderError());
						dispatch(closeModal());
					}}>
						<OrderDetails />
					</Modal>
				) : null
			}
		</>
	);
};

export default App;
