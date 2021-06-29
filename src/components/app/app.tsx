import AppHeader from '../app-header/app-header';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import styles from './app.module.css';

const App = () => (
	<>
		<AppHeader />
		<main className={styles.main}>
			<BurgerIngredients />
			<BurgerConstructor />
		</main>
	</>
);

export default App;
