import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getFormattedDate, getOrderStatus, getTotalPrice } from '../../services/helpers';
import styles from './order-details.module.css';

const OrderDetails = (props) => {
    const { orderDetails } = props;
    const { ingredients } = useSelector(state => state.ingredients);
    const orderIngredientsUnique = Array.from(new Set(orderDetails.ingredients));

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

OrderDetails.defaultProps = { orderDetails: {} };
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
