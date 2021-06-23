import React from 'react';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { constructorData, ingredients } from '../../utils/data';
import styles from './burger-constructor.module.css';

class BurgerConstructor extends React.Component {
    render() {
        const totalPrice = constructorData.reduce((total, current) => {
            return total + current.price;
        }, 0);
        return (
            <section style={{ width: 600 }}>
                <div className={styles.ingredientsWrapper}>
                    {
                        constructorData.filter(ingredient =>
                            ingredient.type === 'top',
                        ).map(topBun => (
                            <ConstructorElement
                                key={topBun.id}
                                type={topBun.type}
                                isLocked={topBun.is_locked}
                                text={topBun.text}
                                price={topBun.price}
                                thumbnail={topBun.thumbnail}
                            />
                        ))
                    }
                    <ul className={styles.toppings}>
                        {
                            constructorData.filter(ingredient =>
                                ingredient.type === undefined
                            ).map(topping => (
                                <>
                                    <li style={{ width: 568, marginRight: 18 }}>
                                        <DragIcon type="primary" />
                                        <ConstructorElement
                                            key={topping.id}
                                            type={topping.type}
                                            isLocked={topping.is_locked}
                                            text={topping.text}
                                            price={topping.price}
                                            thumbnail={topping.thumbnail}
                                        />
                                    </li>
                                </>
                            ))
                        }
                    </ul>
                    {
                        constructorData.filter(ingredient =>
                            ingredient.type === 'bottom',
                        ).map(bottomBun => (
                            <ConstructorElement
                                key={bottomBun.id}
                                type={bottomBun.type}
                                isLocked={bottomBun.is_locked}
                                text={bottomBun.text}
                                price={bottomBun.price}
                                thumbnail={bottomBun.thumbnail}
                            />
                        ))
                    }
                </div>
                <div className={styles.submitBlock}>
                    <small className={`${styles.totalPrice} text text_type_digits-medium`}>
                        {totalPrice}&nbsp;
                        <CurrencyIcon type="primary" />
                    </small>
                    <Button type="primary" size="large">
                        Оформить заказ
                    </Button>
                </div>
            </section>
        );
    }
}

export default BurgerConstructor;
