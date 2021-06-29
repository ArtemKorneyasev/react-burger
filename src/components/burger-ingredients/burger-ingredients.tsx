import { ingredients } from '../../utils/data';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import styles from './burger-ingredients.module.css';

const BurgerIngredients = () => (
    <section className={styles.section}>
        <h1 className={`text text_type_main-large ${styles.title}`}>
            Соберите бургер
        </h1>
        <div className={styles.tabs}>
            <Tab value="buns" active={true} onClick={() => {}}>
                Булки
            </Tab>
            <Tab value="sauces" active={false} onClick={() => {}}>
                Соусы
            </Tab>
            <Tab value="mains" active={false} onClick={() => {}}>
                Начинки
            </Tab>
        </div>
        <div className={styles.ingredientsWrapper}>
            <h3 className={`${styles.subtitle} text text_type_main-medium`}>
                Булки
            </h3>
            <ul className={styles.ingredientsBlock}>
                {
                    ingredients.filter(ingredient =>
                        ingredient.type === 'bun'
                    ).map(bunItem =>
                        <IngredientCard key={bunItem._id} data={bunItem} />
                    )
                }
            </ul>
            <h3 className={`${styles.subtitle} text text_type_main-medium`}>
                Соусы
            </h3>
            <ul className={styles.ingredientsBlock}>
                {
                    ingredients.filter(ingredient =>
                        ingredient.type === 'sauce'
                    ).map(sauceItem =>
                        <IngredientCard key={sauceItem._id} data={sauceItem} />
                    )
                }
            </ul>
            <h3 className={`${styles.subtitle} text text_type_main-medium`}>
                Начинка
            </h3>
            <ul className={styles.ingredientsBlock}>
                {
                    ingredients.filter(ingredient => 
                        ingredient.type === 'main'
                    ).map(mainItem =>
                        <IngredientCard key={mainItem._id} data={mainItem} />
                    )
                }
            </ul>
        </div>
    </section>
);

export default BurgerIngredients;
