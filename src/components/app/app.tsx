import { useState, useEffect } from 'react';
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
		const url = 'https://norma.nomoreparties.space/api/ingredients';
        const getIngredientsData = async () => {
			const response = await fetch(url);

			try {
				const { data } = await response.json();
				setState({ ...state, data });
			} catch (error) {
				setState({ ...state, hasError: true });
			}
        }

        getIngredientsData();
    }, [])

	return (
		<>
			<AppHeader />
			<main className={styles.main}>
				<BurgerIngredients
					ingredients={state.data}
					hasError={state.hasError}
				/>
				<BurgerConstructor
					ingredients={state.data}
					hasError={state.hasError}
				/>
			</main>
		</>
	);
};

export default App;
