import { useState } from 'react';
import {
    // temporary disabled
    // Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredients-details/ingredient-details';
import type { Ingredient } from '../../types/types';
import styles from './ingredient-card.module.css';

type Props = {
    data: Ingredient,
};

const IngredientCard = (props: Props) => {
    const { data } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className={styles.ingredientWrapper}>
            <li
                className={styles.ingredientCard}
                onClick={() => setModalIsOpen(true)}
            >
                <img
                    className={styles.ingredientImg}
                    src={data.image}
                    alt={data.name}
                />
                <small className={`${styles.ingredientPrice} text text_type_digits-default`}>
                    {data.price}&nbsp;
                    <CurrencyIcon type="primary" />
                </small>
                <small className={`${styles.ingredientName} text text_type_main-default`}>
                    {data.name}
                </small>
                {/* <Counter count={1} size="default" /> */}
            </li>
            {
                modalIsOpen ? (
                    <IngredientDetails
                        data={data}
                        onClose={() => setModalIsOpen(false)}
                    />
                ) : null
            }
        </div>
    );
};

export default IngredientCard;
