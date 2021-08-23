import PropTypes from 'prop-types';
import format from 'date-fns/format';
import ruLocale from 'date-fns/locale/ru';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './order-details.module.css';

const OrderDetails = (props) => {
    const { orderDetails } = props;
    const { ingredients } = useSelector(state => state.ingredients);
    const orderIngredientsUnique = Array.from(new Set(orderDetails.ingredients));

    const getTotalPrice = useCallback(() => {
        return ingredients.filter(ingredient =>
            orderDetails.ingredients.includes(ingredient._id),
        ).reduce((total, current) => {
            if (current.type === 'bun') {
                total += (current.price * 2);
            } else {
                total += current.price
            }
            return total;
        }, 0);
    }, [orderDetails, ingredients]);

    const getOrderStatus = () => {
        switch (orderDetails.status) {
            case 'created':
                return 'Создан';
            case 'pending':
                return 'Готовится';
            case 'done':
                return 'Выполнен';
            default:
                return 'Статус неизвестен';
        }
    };

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
               <span className={orderDetails.status === 'done' ? styles.doneStatus : null}>
                   {getOrderStatus()}
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
                    orderIngredientsUnique.map((uniqueId, index) => (
                        <div
                            key={index}
                            className={`text text_type_main-default ${styles.ingredientCard}`}
                        >
                            <div className={styles.ingredient}>
                                <img
                                    src={ingredients.find(ingredient =>
                                        ingredient._id === uniqueId,
                                    ).image_mobile}
                                    alt="orderIngredient"
                                />
                            </div>
                            <div style={{ display: 'flex' }}>
                                <div className={styles.ingredientName}>
                                    {ingredients.find(ingredient =>
                                        ingredient._id === uniqueId,
                                    ).name}
                                </div>
                                <div className={styles.ingredientPrice}>
                                    {
                                        orderDetails.ingredients.filter(id =>
                                            id === uniqueId,
                                        ).length
                                    }
                                    &nbsp;x {ingredients.find(ingredient =>
                                        ingredient._id === uniqueId,
                                    ).price}&nbsp;
                                    <CurrencyIcon />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div className={styles.timestamp}>
                <span className="text text_type_main-default text_color_inactive">
                    {format(
                        new Date(orderDetails.createdAt),
                        'cccc, HH:mm OOO',
                        { locale: ruLocale },
                    )}
                </span>
                <span className="text text_type_digits-medium">
                    {getTotalPrice()}
                    &nbsp;
                    <CurrencyIcon type="primary" />
                </span>
            </div>
       </div>
    );
};

OrderDetails.propTypes = {
    orderDetails: PropTypes.shape({
        createdAt: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string,
        number: PropTypes.number,
        status: PropTypes.string,
        updatedAt: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
};

export default OrderDetails;
