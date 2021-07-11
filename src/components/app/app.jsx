import { useReducer, useEffect } from 'react';
import { AppContext } from '../../services/appContext';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

const initialState = {
	ingredients: [],
	ingredientsError: false,
	burgerData: {
		bun: {},
		toppings: [],
	},
	modalIsOpen: false,
	ingredientInfo: {},
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'ingredientsFetch':
			return { ...state, ingredients: action.payload };
		case 'ingredientsError':
			return { ...state, ingredientsError: true };
		case 'addIngredient':
			if (action.payload.type === 'bun') {
				return prevState => ({
					...prevState,
					burgerData: {
						...prevState.burgerData,
						bun: Object.assign(state.burgerData.bun, action.payload),
					},
					modalIsOpen: true,
					ingredientInfo: Object.assign(state.ingredientInfo, action.payload),
				});
			}

			return prevState => ({
				...prevState,
				burgerData: {
					...prevState.burgerData,
					toppings: state.burgerData.toppings.push(action.payload),
				},
				modalIsOpen: true,
				ingredientInfo: Object.assign(state.ingredientInfo, action.payload),
			});
		case 'removeTopping':
			return prevState => ({
				...prevState,
				burgerData: {
					...prevState.burgerData,
					toppings: state.burgerData.toppings.splice(action.index, 1),
				}
			});
		case 'closeModal':
			return { ...state, modalIsOpen: false };
		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState, undefined);

	useEffect(() => {
		const request = new Request(
			'https://norma.nomoreparties.space/api/ingredients',
		);
        const getIngredientsData = async () => {
			try {
				const response = await fetch(request);

				if (!response.ok) {
					throw new Error(`Произошла ошибка, cтатус: ${response.status}`);
				}

				const { data } = await response.json();
				dispatch({ type: 'ingredientsFetch', payload: data });
			} catch (error) {
				dispatch({ type: 'ingredientsError' });
			}
        };

        getIngredientsData();
    }, [])

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
						ingredientInfo: state.ingredientInfo,
						dispatch,
					}}
				>
					<BurgerIngredients />
					{/* <BurgerConstructor /> */}
				</AppContext.Provider>
			</main>
		</>
	);
};

export default App;
