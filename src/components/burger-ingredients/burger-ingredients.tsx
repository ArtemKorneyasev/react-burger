import React from 'react';
import { ingredients } from '../../utils/data';
import {
    Tab,
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-ingredients.module.css';

class BurgerIngredients extends React.Component {
    render() {
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
                <h3 className={`${styles.subtitle} text text_type_main-medium`}>
                    Булки
                </h3>
                <div className={styles.ingredientsWrapper}>
                    <div className={styles.ingredientsBlock}>
                        {ingredients.filter(ingredient => 
                            ingredient.type === 'bun'
                        ).map(bun => (
                            <div
                                key={bun._id}
                                className={styles.ingredientCard}
                            >
                                <img className={styles.ingredientImg} src={bun.image} alt={bun.name} />
                                <small className={`${styles.ingredientPrice} text text_type_digits-default`}>
                                    {bun.price}&nbsp;
                                    <CurrencyIcon type="primary" />
                                </small>
                                <small className={`${styles.ingredientName} text text_type_main-default`}>
                                    {bun.name}
                                </small>
                                <Counter count={1} size="default" />
                            </div>
                        ))}
                    </div>
                    <h3 className={`${styles.subtitle} text text_type_main-medium`}>
                        Соусы
                    </h3>
                    <div className={styles.ingredientsBlock}>
                        {ingredients.filter(ingredient => 
                            ingredient.type === 'sauce'
                        ).map(sauce => (
                            <div
                                key={sauce._id}
                                className={styles.ingredientCard}
                            >
                                <img className={styles.ingredientImg} src={sauce.image} alt={sauce.name} />
                                <small className={`${styles.ingredientPrice} text text_type_digits-default`}>
                                    {sauce.price}&nbsp;
                                    <CurrencyIcon type="primary" />
                                </small>
                                <small className={`${styles.ingredientName} text text_type_main-default`}>
                                    {sauce.name}
                                </small>
                                {/* <Counter count={1} size="default" /> */}
                            </div>
                        ))}
                    </div>
                    <h3 className={`${styles.subtitle} text text_type_main-medium`}>
                        Начинка
                    </h3>
                    <div className={styles.ingredientsBlock}>
                        {ingredients.filter(ingredient => 
                            ingredient.type === 'main'
                        ).map(main => (
                            <div
                                key={main._id}
                                className={styles.ingredientCard}
                            >
                                <img className={styles.ingredientImg} src={main.image} alt={main.name} />
                                <small className={`${styles.ingredientPrice} text text_type_digits-default`}>
                                    {main.price}&nbsp;
                                    <CurrencyIcon type="primary" />
                                </small>
                                <small className={`${styles.ingredientName} text text_type_main-default`}>
                                    {main.name}
                                </small>
                                {/* <Counter count={1} size="default" /> */}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }
}

export default BurgerIngredients;
