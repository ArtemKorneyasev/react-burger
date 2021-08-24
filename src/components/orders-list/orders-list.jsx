import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { wsShowOrderDetails } from '../../services/redux/actions/wsAllOrdersActions';
import { openOrderDetailsModal } from '../../services/redux/actions/modalActions';
import OrderCard from "../order-card/order-card";
import styles from './orders-list.module.css';

const OrdersList = (props) => {
    const { mode } = props;
    const { allOrders } = useSelector(state => state.wsAllOrders);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const onOrderCardClick = useCallback(orderData => {
        dispatch(wsShowOrderDetails(orderData));
        dispatch(openOrderDetailsModal());
        history.push({
            pathname: `/feed/${orderData._id}`,
            state: { background: location} ,
        });
    }, [dispatch, history, location]);

    return (
        <section
            className={mode === 'profile' ? styles.feedSectionLarge : styles.feedSection}
        >
            {
                mode === 'feed' ? (
                    <h1 className={`text text_type_main-large ${styles.title}`}>
                        Лента заказов
                    </h1>
                ) : null
            }
            <div className={styles.ordersWrapper}>
                {
                    allOrders.map(order => (
                        <OrderCard
                            key={order._id}
                            mode={mode}
                            orderData={order}
                            onClick={onOrderCardClick}
                        />
                    ))
                }
            </div>
        </section>
    );
};

OrdersList.defaultProps = { mode: 'feed' };
OrdersList.propTypes = { mode: PropTypes.string.isRequired };

export default OrdersList;
