import { FC } from 'react';
import { useSelector } from '../../services/redux/hooks';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import {
    findIngredient,
    getFormattedDate,
    getOrderStatus,
    getTotalPrice,
} from '../../services/helpers';
import { TOrder } from '../../services/types';
import styles from './order-card.module.css';

interface IProps {
    mode?: 'profile' | 'feed';
    orderData: TOrder;
    onClick: (orderData: TOrder) => void;
}

const OrderCard: FC<IProps> = (props: IProps) => {
    const { mode, orderData, onClick } = props;
    const { ingredients } = useSelector(state => state.ingredients);
    const orderIngredientsUnique: ReadonlyArray<string> =
        orderData && Array.from(new Set(orderData.ingredients));

    return (
        <div
            className={styles.root}
            onClick={() => onClick(orderData)}
        >
            <header className={styles.header}>
                <span className={`text text_type_digits-default ${styles.orderId}`}>
                    {`#${orderData.number}`}
                </span>
                <span
                    className={
                        `text text_type_main-default text_color_inactive ${styles.timestamp}`
                    }
                >
                    {getFormattedDate(orderData.createdAt)}
                </span>
            </header>
            <span className="text text_type_main-medium">
                {orderData.name}
            </span>
            {
                mode === 'profile' ? (
                    <div className="text text_type_main-default">
                        <span
                            className={orderData.status === 'done' ? styles.doneStatus : ''}
                        >
                            {getOrderStatus(orderData.status)}
                        </span>
                    </div>
                ) : null
            }
            <div className={styles.ingredientsContainer}>
                <div className={styles.ingredientsGallery}>
                    {
                        orderIngredientsUnique &&
                        orderIngredientsUnique.slice(0,5).map((uniqueId, index) => {
                            const found = findIngredient(
                                uniqueId,
                                ingredients,
                            );

                            return (
                                <div
                                    key={index}
                                    className={styles.ingredient}
                                    style={{ zIndex: 5 - index }}
                                >
                                    {
                                        found ? (
                                            <img
                                                src={found.image_mobile}
                                                alt="ingredient"
                                            />
                                        ) : null
                                    }
                                </div>
                            );
                        })
                    }
                    {
                        orderIngredientsUnique.slice(5,).length ? (
                            <div className={styles.restIngredients}>
                                <div style={{ opacity: 0.6 }} className={styles.ingredient}>
                                    <img
                                        src={
                                            findIngredient(
                                                orderIngredientsUnique[5],
                                                ingredients,
                                            )!.image_mobile
                                        }
                                        alt="restIngredients"
                                    />
                                </div>
                                <span className={`text text_type_digits-default ${styles.counter}`}>
                                    {`+${orderIngredientsUnique.slice(5,).length}`}
                                </span>
                            </div>
                        ) : null
                    }
                </div>
                <span className="text text_type_digits-medium">
                    {getTotalPrice(ingredients, orderData)}
                    &nbsp;
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    );
};

export default OrderCard;
