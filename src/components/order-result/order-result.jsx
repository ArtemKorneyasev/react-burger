import { useSelector } from 'react-redux';
import doneIcon from '../../images/doneIcon.svg';
import styles from './order-result.module.css';

const OrderResult = (props) => {
    const { orderResult, orderError } = useSelector(state => state.order);

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
                {orderResult.success ? orderResult.order.number : null}
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

export default OrderResult;
