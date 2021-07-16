import PropTypes from 'prop-types';
import doneIcon from '../../images/doneIcon.svg';
import styles from './order-details.module.css';

const OrderDetails = (props) => {
    const { orderDetails, orderError } = props;

    if (orderError) {
        return (
            <span className="text text_type_main-medium">
                {orderError}
            </span>
        );
    }

    return (
        <>
            <span className={`text text_type_digits-large ${styles.orderId}`}>
                {orderDetails.order.number}
            </span>
            <span className="text text_type_main-medium">
                идентификатор заказа
            </span>
            <div className={styles.doneIcon}>
                <img src={doneIcon} alt="done-icon" />
            </div>
            <div className={styles.description}>
                <span className="text text_type_main-default">
                    Ваш заказ начали готовить
                </span>
                <span
                    style={{ color: '#8585AD' }}
                    className="text text_type_main-default"
                >
                    Дождитесь готовности на орбитальной станции
                </span>
            </div>
        </>
    );
};

OrderDetails.propTypes = {
    orderDetails: PropTypes.shape({
        name: PropTypes.string.isRequired,
        order: PropTypes.shape({
            number: PropTypes.number,
        }).isRequired,
        success: PropTypes.bool.isRequired,
    }),
    orderError: PropTypes.string,
};

export default OrderDetails;
