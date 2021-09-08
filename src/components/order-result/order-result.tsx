import { FC } from 'react';
import Loader from 'react-loader-spinner';
import { useSelector } from '../../services/redux/hooks';
import doneIcon from '../../images/doneIcon.svg';
import styles from './order-result.module.css';

const OrderResult: FC = () => {
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
                {
                    orderResult &&
                    orderResult.success ? orderResult.order.number : (
                        <Loader
                            type="Puff"
                            color="#8585ad"
                            height={100}
                            width={100}
                        />
                    )
                }
            </span>
            <span className="text text_type_main-medium">
                {
                    orderResult &&
                    orderResult.success ? 'идентификатор заказа' : 'регистрируем заказ'
                }
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
