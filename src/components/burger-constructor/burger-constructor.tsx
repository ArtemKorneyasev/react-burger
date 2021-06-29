import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredients } from '../../utils/data';
import styles from './burger-constructor.module.css';

const BurgerConstructor = () => {
    let totalPrice = 2510;
    const modIngredients = ingredients.slice(1, ingredients.length - 1);
    const randToppings = [];

    for (let i = 0; i <= 10; i++) {
        const randIndex = Math.floor(
            Math.random() * modIngredients.length,
        );
        randToppings.push(modIngredients[randIndex]);
    }

    totalPrice += randToppings.reduce((total, current) => {
        return total + current.price;
    }, 0);

    return (
        <section style={{ width: 600 }}>
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
                        randToppings.map(topping => (
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
                <Button type="primary" size="large">
                    Оформить заказ
                </Button>
            </div>
        </section>
    );
}

export default BurgerConstructor;
