import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getIngredients } from '../../services/actions';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredients-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import styles from './app.module.css';

const App = () => {
	const dispatch = useDispatch();
	const {
		ingredientInfo,
		modalIsOpen,
		modalMode,
		orderDetails,
		orderError,
	} = useSelector(state => ({
		ingredientInfo: state.app.ingredientInfo,
		modalIsOpen: state.app.modalIsOpen,
		modalMode: state.app.modalMode,
		orderDetails: state.app.orderDetails,
		orderError: state.app.orderError,
	}));

	useEffect(() => {
		dispatch(getIngredients());
    }, [dispatch])

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients />
				<BurgerConstructor />
			</main>
			{
				modalIsOpen &&
				modalMode === 'ingredient-details' ? (
					<Modal
						title="Детали ингредиента"
						onClose={() => dispatch(closeModal())}
					>
						<IngredientDetails data={ingredientInfo} />
					</Modal>
				) : null
			}
			{
				modalIsOpen &&
				modalMode === 'order-details' ? (
					<Modal onClose={() => dispatch(closeModal())}>
						<OrderDetails
							orderDetails={orderDetails}
							orderError={orderError}
						/>
					</Modal>
				) : null
			}
		</>
	);
};

export default App;
