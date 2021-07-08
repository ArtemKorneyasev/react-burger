import React, { useState, useMemo, useEffect, useContext, useCallback } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppContext } from '../services/appContext';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const [state, setState] = useState({
        modalIsOpen: false,
        totalPrice: 0,
        orderDetails: null,
        orderError: false,
    });
    const { ingredients, ingredientsError } = useContext(AppContext);

    const randomIngredients = useMemo(() => {
        const randBun = [];
        const randToppings = [];
        const randIndex = arr => Math.floor(Math.random() * arr.length);

        if (ingredients.length) {
            const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
            const toppings = ingredients.filter(ingredient => ingredient.type !== 'bun');

            randBun.push(buns[randIndex(buns)]);
            for (let i = 1; i <= 10; i++) {
                randToppings.push(toppings[randIndex(toppings)]);
            }

            const toppingsPrice = randToppings.reduce((total, current) => {
                return total + current.price;
            }, 0);
            const bunsPrice = randBun[0].price * 2;

            setState({
                ...state,
                totalPrice: (toppingsPrice + bunsPrice),
            });
        }

        return { randToppings, randBun };
    }, [ingredients]);

    const onSubmit = () => {
        const url = 'https://norma.nomoreparties.space/api/orders';
        const requestData = {
            ingredients: Object.keys(randomIngredients).flatMap(ingredientType =>
                randomIngredients[ingredientType].map(
                    ingredient => ingredient._id,
                ),
            ),
        };

        (async () => {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData),
                });

                if (response && response.ok) {
					const data = await response.json();
                    setState({
                        ...state,
                        modalIsOpen: true,
                        orderDetails: data,
                    });
				}
            } catch (error) {
                setState({
                    ...state,
                    modalIsOpen: true,
                    orderError: true,
                });
            }
        })();
    };

    if (ingredientsError) {
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
                {
                    randomIngredients.randBun.map(bun => (
                        <React.Fragment key={bun._id}>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={bun.name}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        </React.Fragment>
                    ))
                }
                <ul className={styles.toppings}>
                    {
                        randomIngredients.randToppings.map(topping => (
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
                {
                    randomIngredients.randBun.map(bun => (
                        <React.Fragment key={bun._id}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bun.name}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        </React.Fragment>
                    ))
                }
            </div>
            <div className={styles.submitBlock}>
                <span className={`${styles.totalPrice} text text_type_digits-medium`}>
                    {state.totalPrice}&nbsp;
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={onSubmit}>
                    Оформить заказ
                </Button>
            </div>
            {
                state.modalIsOpen ? (
                    <Modal onClose={() => setState({ ...state, modalIsOpen: false })}>
                        <OrderDetails
                            orderDetails={state.orderDetails}
                            orderError={state.error}
                        />
                    </Modal>
                ) : null
            }
        </section>
    );
}

export default BurgerConstructor;
