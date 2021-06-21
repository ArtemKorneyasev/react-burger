import React from 'react';
import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
// import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

class App extends React.Component {
	render() {
		return (
			<>
				<AppHeader />
				<main className={styles.main}>
					<div style={{ marginRight: 40 }}>
						<BurgerIngredients />
					</div>
					<BurgerIngredients />
					{/* <BurgerConstructor /> */}
				</main>
			</>
		);
	}
}

export default App;
