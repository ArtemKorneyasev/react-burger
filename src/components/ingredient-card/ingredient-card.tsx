import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

type Props = {
    data: {
        _id: string,
        name: string,
        type: string,
        proteins: number,
        fat: number,
        carbohydrates: number,
        calories: number,
        price: number,
        image: string,
        image_mobile: string,
        image_large: string,
        __v: number,
    },
};

const IngredientCard = (props: Props) => {
    const { data } = props;
    return (
        <li className={styles.ingredientCard}>
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
    );
};

export default IngredientCard;
