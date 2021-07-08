import { useState, useEffect } from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { AppContext } from '../services/appContext';
import styles from './app.module.css';

const App = () => {
	const [state, setState] = useState({
        data: [],
		hasError: false,
    });

	useEffect(() => {
		const url = 'https://norma.nomoreparties.space/api/ingredients';
        const getIngredientsData = async () => {
			try {
				const response = await fetch(url);

				if (response && response.ok) {
					const { data } = await response.json();
					setState({ ...state, data });
				}
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
					<BurgerIngredients
						ingredients={state.data}
						hasError={state.hasError}
					/>
					<BurgerConstructor />
				</AppContext.Provider>
			</main>
		</>
	);
};

export default App;
