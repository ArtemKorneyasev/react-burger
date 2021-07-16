import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

const IngredientCard = (props) => {
    const { data, onClick } = props;

    return (
        <div
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
                    // // @TODO(2021-07-12) - need to implement counter
                    // count > 0 && <Counter count={count} size="default" />
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
