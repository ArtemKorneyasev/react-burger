import { useState, useMemo } from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import type { Ingredients } from '../../types/types';
import styles from './burger-constructor.module.css';

type Props = {
    ingredients: Ingredients,
    hasError: boolean,
};

const BurgerConstructor = (props: Props) => {
    const { ingredients, hasError } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);
    let totalPrice = 2510;

    const randomToppings = useMemo(() => {
        const randToppings = [];
        if (ingredients.length) {
            const modIngredients = ingredients.filter(
                ingredient => ingredient.type !== 'bun',
            );

            for (let i = 1; i <= 10; i++) {
                const randIndex = Math.floor(
                    Math.random() * modIngredients.length,
                );
                randToppings.push(modIngredients[randIndex]);
            }

            totalPrice += randToppings.reduce((total, current) => {
                return total + current.price;
            }, 0);
        }

        return randToppings;
    }, [ingredients]);

    if (hasError) {
        return (
            <section style={{ width: 600 }}>
                <h1 className={`text text_type_main-large ${styles.title}`}>
                    Ошибка получения данных...
                </h1>
            </section>
        );
    }

    return (
        <section style={{ width: 600, overflow: 'hidden' }}>
            <div className={styles.ingredientsWrapper}>
                <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={1255}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                />
                <ul className={styles.toppings}>
                    {
                        randomToppings.map(topping => (
                            <li
                                key={topping._id}
                                style={{ width: 568, marginRight: 18 }}
                            >
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    isLocked={false}
                                    text={topping.name}
                                    price={topping.price}
                                    thumbnail={topping.image_mobile}
                                />
                            </li>
                        ))
                    }
                </ul>
                <ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={1255}
                    thumbnail="https://code.s3.yandex.net/react/code/bun-02-mobile.png"
                />
            </div>
            <div className={styles.submitBlock}>
                <small className={`${styles.totalPrice} text text_type_digits-medium`}>
                    {totalPrice}&nbsp;
                    <CurrencyIcon type="primary" />
                </small>
                <Button
                    type="primary"
                    size="large"
                    onClick={() => setModalIsOpen(true)}
                >
                    Оформить заказ
                </Button>
            </div>
            {
                modalIsOpen ? (
                    <OrderDetails
                        onClose={() => setModalIsOpen(false)}
                    />
                ) : null
            }
        </section>
    );
}

export default BurgerConstructor;
