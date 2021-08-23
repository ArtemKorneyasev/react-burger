import PropTypes from 'prop-types';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { showOrderDetails } from '../../services/redux/actions/orderActions';
import { openOrderDetailsModal } from '../../services/redux/actions/modalActions';
import { wsConnectionStart } from '../../services/redux/actions/wsActions';
import OrderCard from "../order-card/order-card";
import styles from './orders-list.module.css';

const OrdersList = (props) => {
    const { mode } = props;
    const { orders } = useSelector(state => state.order);
    const { user } = useSelector(state => state.user);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    useEffect(() => {
        if (user.email) {
            dispatch(wsConnectionStart());
        }
    }, [user, dispatch]);

    const onOrderCardClick = useCallback(orderData => {
        dispatch(showOrderDetails(orderData));
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
                    orders.map(order => (
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
