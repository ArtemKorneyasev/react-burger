import {
    // temporary disabled
    // Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import type { Ingredient } from '../../types/types';
import styles from './ingredient-card.module.css';

type Props = {
    data: Ingredient,
    onClick: Function,
};

const IngredientCard = (props: Props) => {
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
                {/* <Counter count={1} size="default" /> */}
            </li>
        </div>
    );
};

export default IngredientCard;
