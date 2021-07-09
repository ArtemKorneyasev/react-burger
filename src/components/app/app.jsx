import { useState, useEffect } from 'react';
import { AppContext } from '../../services/appContext';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

const App = () => {
	const [state, setState] = useState({
        data: [],
		hasError: false,
    });

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
				setState({ ...state, data });
			} catch (error) {
				setState({ ...state, hasError: true });
			}
        };

        getIngredientsData();
    }, [])

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<AppContext.Provider value={{
					ingredients: state.data,
					ingredientsError: state.hasError,
				}}>
					<BurgerIngredients />
					<BurgerConstructor />
				</AppContext.Provider>
			</main>
		</>
	);
};

export default App;
