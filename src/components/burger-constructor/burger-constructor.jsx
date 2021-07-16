import { useEffect } from 'react';
import PropsTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from "react-dnd";
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getTotalPrice, getOrderDetails, deleteTopping } from '../../services/actions';
import styles from './burger-constructor.module.css';

const BurgerConstructor = (props) => {
    const { onDropHandler } = props;
    const dispatch = useDispatch();
    const { burgerData, totalPrice } = useSelector(state => ({
        burgerData: state.app.burgerData,
        totalPrice: state.app.totalPrice,
    }));
    const [{isHover}, dropTarget] = useDrop({
        accept: "ingredient-card",
        drop(itemId) {
            onDropHandler(itemId);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        }),
    });
    const { bun, toppings } = burgerData;

    useEffect(() => {
        dispatch(getTotalPrice(burgerData));
    }, [dispatch, burgerData]);

    const onSubmit = () => {
        dispatch(getOrderDetails(burgerData));
    };

    return (
        <section style={{ width: 600, overflow: 'hidden' }}>
            <div
                ref={dropTarget}
                style={{
                    border: '1px dashed',
                    borderRadius: 40,
                    borderColor: isHover ? '#8585AD' : 'transparent',
                }}
                className={styles.ingredientsWrapper}
            >
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
                                    handleClose={() => dispatch(deleteTopping(index))}
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

BurgerConstructor.propsTypes = {
    onDropHandler: PropsTypes.func,
};

export default BurgerConstructor;
