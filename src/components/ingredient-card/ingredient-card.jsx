import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDrag } from "react-dnd";
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

const IngredientCard = (props) => {
    const { data, onClick } = props;
    const [count, setCount] = useState(0);
    const burgerData = useSelector(state => state.app.burgerData);

    const [, dragIngredientCard] = useDrag({
        type: "ingredient-card",
        item: { id: data._id },
    });

    useEffect(() => {
        const { bun, toppings } = burgerData;

        if (data.type === 'bun') {
            setCount(
                Object.values(bun).filter(
                    value => value === data._id,
                ).length
            );
        } else {
            setCount(
                toppings.filter(
                    topping => topping._id === data._id,
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

IngredientCard.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default React.memo(IngredientCard);
