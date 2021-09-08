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
import styles from './order-details.module.css';

interface IProps {
    orderDetails: TOrder | null;
}

const OrderDetails: FC<IProps> = (props: IProps) => {
    const { orderDetails } = props;
    const { ingredients } = useSelector(state => state.ingredients);
    const orderIngredientsUnique = orderDetails && Array.from(new Set(orderDetails.ingredients));

    if (!orderDetails) {
        return null;
    }

    return (
        <div>
            <div className={`text text_type_digits-default ${styles.orderId}`}>
                {`#${orderDetails.number}`}
            </div>
            <div
                style={{ marginBottom: 12 }}
                className="text text_type_main-medium"
            >
               {orderDetails.name}
           </div>
           <div
                style={{ marginBottom: 60 }}
                className={'text text_type_main-default'}
            >
               <span className={orderDetails.status === 'done' ? styles.doneStatus : ''}>
                   {getOrderStatus(orderDetails.status)}
               </span>
           </div>
            <div
                style={{ marginBottom: 24 }}
                className="text text_type_main-medium"
            >
                Состав:
            </div>
            <div className={styles.ingredientsWrapper}>
                {
                    orderIngredientsUnique &&
                    orderIngredientsUnique.map((uniqueId) => {
                        const found = findIngredient(
                            uniqueId,
                            ingredients,
                        );

                        return (
                            <div
                                key={uniqueId}
                                className={`text text_type_main-default ${styles.ingredientCard}`}
                            >
                                <div className={styles.ingredient}>
                                    {
                                        found ? (
                                            <img
                                                src={found.image_mobile}
                                                alt="orderIngredient"
                                            />
                                        ) : null
                                    }
                                </div>
                                <div style={{ display: 'flex' }}>
                                    <div className={styles.ingredientName}>
                                        {found ? found.name : 'Unknown ingredient'}
                                    </div>
                                    <div className={styles.ingredientPrice}>
                                        {
                                            orderDetails.ingredients.filter(ingredientId =>
                                                ingredientId === uniqueId,
                                            ).length
                                        }
                                        &nbsp;x {found ? found.price : 0}&nbsp;
                                        <CurrencyIcon type='primary' />
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
            <div className={styles.timestamp}>
                <span className="text text_type_main-default text_color_inactive">
                    {getFormattedDate(orderDetails.createdAt)}
                </span>
                <span className="text text_type_digits-medium">
                    {getTotalPrice(ingredients, orderDetails)}
                    &nbsp;
                    <CurrencyIcon type="primary" />
                </span>
            </div>
       </div>
    );
};

export default OrderDetails;
