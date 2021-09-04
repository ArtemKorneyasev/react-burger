import { FC, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/redux/hooks';
import { useHistory } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import {
    Button,
    ConstructorElement,
    CurrencyIcon,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {
    getTotalPrice,
    deleteTopping,
    sortToppings,
} from '../../services/redux/actions/constructorActions';
import { getOrderResult } from '../../services/redux/actions/orderActions';
import { openOrderResultModal } from '../../services/redux/actions/modalActions';
import { isUserAuth } from '../../services/helpers';
import MovableTopping from '../movable-topping/movable-topping';
import { TIngredientData } from '../../services/types';
import styles from './burger-constructor.module.css';

type TDropItem = {
    id: string,
    index: number,
};

interface IProps {
    onDropHandler: (item: TDropItem ) => void;
}

const BurgerConstructor: FC<IProps> = (props: IProps) => {
    const { onDropHandler } = props;
    const { burgerData, totalPrice } = useSelector(state => state.burger);
    const { bun, toppings } = burgerData;

    const dispatch = useDispatch();
    const history = useHistory();

    const [, dropRef] = useDrop({
        accept: 'ingredient-card',
        drop(item: TDropItem) {
            onDropHandler(item);
        },
    });

    const moveTopping = useCallback((dragIndex: number, hoverIndex: number) => {
        dispatch(sortToppings(dragIndex, hoverIndex));
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTotalPrice(burgerData));
    }, [dispatch, burgerData]);

    const onSubmit = () => {
        if (isUserAuth()) {
            dispatch(getOrderResult(burgerData));
            dispatch(openOrderResultModal());
        } else {
            history.replace({ pathname: '/login' });
        }
    };

    return (
        <section style={{ width: 600, overflow: 'hidden' }}>
            <div
                ref={dropRef}
                className={styles.ingredientsWrapper}
            >
                {
                    bun && bun.uniqueId && (
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
                        toppings.map((topping: TIngredientData, index: number) => (
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
                    bun && bun.uniqueId && (
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
};

export default BurgerConstructor;
