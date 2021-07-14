import React, { useContext, useEffect } from 'react';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppContext } from '../../services/appContext';
import {
    CALC_TOTAL_PRICE,
    MAKE_ORDER,
    ORDER_ERROR,
    DELETE_TOPPING,
} from '../../services/actions/appActions';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    const {
        ingredientsError,
        burgerData,
        totalPrice,
        dispatch,
    } = useContext(AppContext);
    const { bun, toppings } = burgerData;

    useEffect(() => {
        const bunsPrice = bun.price * 2 || 0;
        const toppingsPrice = toppings.reduce((total, current) => {
            return total + current.price;
        }, 0);

        dispatch({
            type: CALC_TOTAL_PRICE,
            payload: (bunsPrice + toppingsPrice),
        });
    }, [bun, toppings, dispatch]);

    const onSubmit = () => {
        const { bun } = burgerData;

        if (bun._id) {
            const requestData = {
                ingredients: Object.keys(burgerData).flatMap(ingredientType => {
                    switch (ingredientType) {
                        case 'bun':
                            return burgerData.bun._id;
                        case 'toppings':
                            return burgerData[ingredientType].map(
                                ingredient => ingredient._id,
                            );
                        default:
                            return [];
                    }
                }),
            };
            const request = new Request(
                'https://norma.nomoreparties.space/api/orders',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(requestData),
                },
            );
    
            (async () => {
                try {
                    const response = await fetch(request);
    
                    if (!response.ok) {
                        throw new Error(`Response error, status: ${response.status}`);
                    }
    
                    const data = await response.json();
                    dispatch({ type: MAKE_ORDER, payload: data });
                } catch (error) {
                    dispatch({
                        type: ORDER_ERROR,
                        payload: 'Ошибка получения данных...',
                    });
                }
            })();
        } else {
            dispatch({
                type: ORDER_ERROR,
                payload: 'Должна быть выбрана булка для бургера!',
            });
        }
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
                    bun._id && (
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bun.name}
                            price={bun.price}
                            thumbnail={bun.image_mobile}
                        />
                    )
                }
                <ul className={styles.toppings}>
                    {
                        toppings.map((topping, index) => (
                            <li
                                key={`${topping._id}-${index}`}
                                style={{ width: 568, marginRight: 18 }}
                            >
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    isLocked={false}
                                    text={topping.name}
                                    price={topping.price}
                                    thumbnail={topping.image_mobile}
                                    handleClose={() => dispatch({
                                        type: DELETE_TOPPING,
                                        payload: index,   
                                    })}
                                />
                            </li>
                        ))
                    }
                </ul>
                {
                    bun._id && (
                        <div className={styles.bottomBunWrapper}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={bun.name}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        </div>
                    )
                }
            </div>
            <div className={styles.submitBlock}>
                <span className={`${styles.totalPrice} text text_type_digits-medium`}>
                    {totalPrice}&nbsp;
                    <CurrencyIcon type="primary" />
                </span>
                <Button type="primary" size="large" onClick={onSubmit}>
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;
