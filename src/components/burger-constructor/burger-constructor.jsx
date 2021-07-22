import PropsTypes from 'prop-types';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getTotalPrice, deleteTopping, sortToppings } from '../../services/actions/constructorActions';
import { getOrderDetails } from '../../services/actions/orderActions';
import { openOrderModal } from '../../services/actions/modalActions';
import MovableTopping from '../movable-topping/movable-topping';
import styles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const { onDropHandler } = props;
    const dispatch = useDispatch();
    const { burgerData, totalPrice } = useSelector(state => state.burger);
    const { bun, toppings } = burgerData;

    const [, dropIngredientCard] = useDrop({
        accept: 'ingredient-card',
        drop(itemId) {
            onDropHandler(itemId);
        },
    });
    const [, dropTopping] = useDrop({ accept: 'sort-toppings' });

    useEffect(() => {
        dispatch(getTotalPrice(burgerData));
    }, [dispatch, burgerData]);

    const findTopping = useCallback((id) => {
        const topping = toppings.filter(
            topping => topping._id === id,
        )[0];

        return {
            topping,
            index: toppings.indexOf(topping),
        };
    }, [toppings]);

    const moveTopping = useCallback((index, atIndex) => {
        dispatch(sortToppings(index, atIndex));
    }, [dispatch]);

    const onSubmit = () => {
        dispatch(getOrderDetails(burgerData));
        dispatch(openOrderModal());
    };

    return (
        <section style={{ width: 600, overflow: 'hidden' }}>
            <div
                ref={dropIngredientCard}
                className={styles.ingredientsWrapper}
            >
                {
                    bun._id && (
                        <div>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.name} (верх)`}
                                price={bun.price}
                                thumbnail={bun.image_mobile}
                            />
                        </div>
                    )
                }
                <ul
                    ref={dropTopping}
                    className={styles.toppings}
                >
                    {
                        toppings.map((topping, index) => (
                            <MovableTopping
                                key={`${topping._id}-${index}`}
                                toppingId={topping._id}
                                toppingIndex={index}
                                findTopping={findTopping}
                                moveTopping={moveTopping}
                            >
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    isLocked={false}
                                    text={topping.name}
                                    price={topping.price}
                                    thumbnail={topping.image_mobile}
                                    handleClose={() => dispatch(deleteTopping(index))}
                                />
                            </MovableTopping>
                        ))
                    }
                </ul>
                {
                    bun._id && (
                        <div className={styles.bottomBunWrapper}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.name} (низ)`}
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

BurgerConstructor.propsTypes = {
    onDropHandler: PropsTypes.func,
};

export default BurgerConstructor;
