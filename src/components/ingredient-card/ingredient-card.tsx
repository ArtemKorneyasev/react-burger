import React, { FC, useState, useEffect } from 'react';
import { useSelector } from '../../services/redux/hooks';
import { useDrag } from 'react-dnd';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { TIngredient } from '../../services/types';
import styles from './ingredient-card.module.css';

interface IProps {
    data: TIngredient;
    onClick: (data: TIngredient) => void;
}

const IngredientCard: FC<IProps> = (props: IProps) => {
    const { data, onClick } = props;
    const [count, setCount] = useState<number>(0);
    const { burgerData } = useSelector(state => state.burger);

    const [, dragIngredientCard] = useDrag({
        type: 'ingredient-card',
        item: { id: data._id },
    });

    useEffect(() => {
        const { bun, toppings } = burgerData;

        if (data.type === 'bun') {
            if (bun?.data) {
                setCount(
                    Object.values(bun.data).filter(
                        value => value === data._id,
                    ).length * 2
                );
            }
        } else {
            setCount(
                toppings.filter(
                    topping => topping.data._id === data._id,
                ).length
            );
        }
    }, [burgerData, data]);

    return (
        <div
            ref={dragIngredientCard}
            className={styles.ingredientWrapper}
            onClick={() => onClick(data)}
        >
            <li className={styles.ingredientCard}>
                <img
                    className={styles.ingredientImg}
                    src={data.image}
                    alt={data.name}
                />
                <span className={`${styles.ingredientPrice} text text_type_digits-default`}>
                    {data.price}&nbsp;
                    <CurrencyIcon type="primary" />
                </span>
                <span className={`${styles.ingredientName} text text_type_main-default`}>
                    {data.name}
                </span>
                {
                    count > 0 && <Counter count={count} size="default" />
                }
            </li>
        </div>
    );
};

export default React.memo(IngredientCard);
