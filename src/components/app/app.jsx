import { useReducer, useEffect } from 'react';
import { AppContext } from '../../services/appContext';
import { appReducer } from '../../reducers/appReducer';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import IngredientDetails from '../ingredients-details/ingredient-details';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import styles from './app.module.css';

const initialState = {
	ingredients: [],
	ingredientsError: '',
	ingredientInfo: {},
	burgerData: {
		bun: {},
		toppings: [],
	},
	orderDetails: null,
	orderError: '',
	modalMode: '',
	modalIsOpen: false,
	totalPrice: 0,
};

const App = () => {
	const [state, dispatch] = useReducer(appReducer, initialState, undefined);

	useEffect(() => {
		const request = new Request(
			'https://norma.nomoreparties.space/api/ingredients',
		);
        const getIngredientsData = async () => {
			try {
				const response = await fetch(request);

				if (!response.ok) {
					throw new Error(`Response error, status: ${response.status}`);
				}

				const { data } = await response.json();
				dispatch({ type: 'ingredientsFetch', payload: data });
			} catch (error) {
				dispatch({
					type: 'ingredientsError',
					payload: 'Ошибка получения данных...',
				});
			}
        };

        getIngredientsData();
    }, [dispatch])

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<AppContext.Provider
					value={{
						ingredients: state.ingredients,
						ingredientsError: state.ingredientsError,
						burgerData: state.burgerData,
						modalIsOpen: state.modalIsOpen,
						totalPrice: state.totalPrice,
						dispatch,
					}}
				>
					<BurgerIngredients />
					<BurgerConstructor />
				</AppContext.Provider>
			</main>
			{
				state.modalIsOpen &&
				state.modalMode === 'ingredient-details' ? (
					<Modal
						title="Детали ингредиента"
						onClose={() => dispatch({ type: 'closeModal' })}
					>
						<IngredientDetails data={state.ingredientInfo} />
					</Modal>
				) : null
			}
			{
				state.modalIsOpen &&
				state.modalMode === 'order-details' ? (
					<Modal onClose={() => dispatch({ type: 'closeModal' })}>
						<OrderDetails
							orderDetails={state.orderDetails}
							orderError={state.orderError}
						/>
					</Modal>
				) : null
			}
		</>
	);
};

export default App;
