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

    const [, dropRef] = useDrop({
        accept: 'ingredient-card',
        drop(item) {
            onDropHandler(item);
        },
    });

    const moveTopping = useCallback((dragIndex, hoverIndex) => {
        dispatch(sortToppings(dragIndex, hoverIndex));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTotalPrice(burgerData));
    }, [dispatch, burgerData]);

    const onSubmit = () => {
        dispatch(getOrderDetails(burgerData));
        dispatch(openOrderModal());
    };

    return (
        <section style={{ width: 600, overflow: 'hidden' }}>
            <div
                ref={dropRef}
                className={styles.ingredientsWrapper}
            >
                {
                    bun.uniqueId && (
                        <div>
                            <ConstructorElement
                                type="top"
                                isLocked={true}
                                text={`${bun.data.name} (верх)`}
                                price={bun.data.price}
                                thumbnail={bun.data.image_mobile}
                            />
                        </div>
                    )
                }
                <div className={styles.toppings}>
                    {
                        toppings.map((topping, index) => (
                            <MovableTopping
                                key={topping.uniqueId}
                                toppingId={topping.uniqueId}
                                toppingIndex={index}
                                moveTopping={moveTopping}
                            >
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    isLocked={false}
                                    text={topping.data.name}
                                    price={topping.data.price}
                                    thumbnail={topping.data.image_mobile}
                                    handleClose={() => dispatch(deleteTopping(index))}
                                />
                            </MovableTopping>
                        ))
                    }
                </div>
                {
                    bun.uniqueId && (
                        <div className={styles.bottomBunWrapper}>
                            <ConstructorElement
                                type="bottom"
                                isLocked={true}
                                text={`${bun.data.name} (низ)`}
                                price={bun.data.price}
                                thumbnail={bun.data.image_mobile}
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
