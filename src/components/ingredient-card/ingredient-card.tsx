import { useState } from 'react';
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal';
import type { Ingredient } from '../../types/types';
import styles from './ingredient-card.module.css';

type Props = {
    data: Ingredient,
};

const IngredientCard = (props: Props) => {
    const { data } = props;
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <>
            <Modal
                header="Внимание!"
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
            >
                <p>Спасибо за внимание!</p>
                <p>Открывай меня, если станет скучно</p>
            </Modal>
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
                <Counter count={1} size="default" />
            </li>
        </>
    );
};

export default IngredientCard;
