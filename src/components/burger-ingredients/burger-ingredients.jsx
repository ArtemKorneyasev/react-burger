import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientCard from '../ingredient-card/ingredient-card';
import IngredientDetails from '../ingredients-details/ingredient-details';
import Modal from '../modal/modal';
import type { Ingredients } from '../../types/types';
import styles from './burger-ingredients.module.css';

type Props = {
    ingredients: Ingredients,
    hasError: boolean,
};

const BurgerIngredients = (props: Props) => {
    const { ingredients, hasError } = props;
    const [state, setState] = useState({
        modalIsOpen: false,
        ingredientData: {},
    });

    const onIngredientCardClick = data => (
        setState({
            modalIsOpen: true,
            ingredientData: data,
        })
    );

    if (hasError) {
        return (
            <section className={styles.section}>
                <h1 className={`text text_type_main-large ${styles.title}`}>
                    Ошибка получения данных...
                </h1>
            </section>
        );
    }

    return (
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
                            <IngredientCard
                                key={bunItem._id}
                                data={bunItem}
                                onClick={onIngredientCardClick}
                            />
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
                            <IngredientCard
                                key={sauceItem._id}
                                data={sauceItem}
                                onClick={onIngredientCardClick}
                            />
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
                            <IngredientCard
                                key={mainItem._id}
                                data={mainItem}
                                onClick={onIngredientCardClick}
                            />
                        )
                    }
                </ul>
            </div>
            {
                state.modalIsOpen ? (
                    <Modal
                        title="Детали ингредиента"
                        onClose={() => setState({ ...state, modalIsOpen: false })}
                    >
                        <IngredientDetails data={state.ingredientData} />
                    </Modal>
                ) : null
            }
        </section>
    );
};

export default BurgerIngredients;
