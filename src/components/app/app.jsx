import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
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
import styles from './app.module.css';

const App = () => {
	const dispatch = useDispatch();
	const { ingredients } = useSelector(state => state.ingredients);
	const { orderDetails } = useSelector(state => state.order);
	const { modalIsOpen, modalMode } = useSelector (state => state.modal);

	useEffect(() => {
		dispatch(getIngredients());
    }, [dispatch]);

	const handleDrop = item => {
		dispatch(addIngredient(
			ingredients.filter(
				ingredient => ingredient._id === item.id,
			)[0],
		));
    };

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<DndProvider backend={HTML5Backend}>
					<BurgerIngredients />
					<BurgerConstructor onDropHandler={handleDrop} />
				</DndProvider>
			</main>
			{
				modalIsOpen &&
				modalMode === 'ingredient-details' ? (
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
				modalIsOpen &&
				modalMode === 'order-details' ? (
					<Modal onClose={() => {
						if (orderDetails.success) {
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
