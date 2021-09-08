import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from '../../services/redux/hooks';
import { useHistory, useLocation } from 'react-router-dom';
import { wsShowOrderDetails } from '../../services/redux/actions/wsAllOrdersActions';
import { openOrderDetailsModal } from '../../services/redux/actions/modalActions';
import OrderCard from '../order-card/order-card';
import { TOrder } from '../../services/types';
import styles from './orders-list.module.css';

interface IProps {
    mode?: 'profile' | 'feed';
}

const OrdersList: FC<IProps> = (props: IProps) => {
    const { mode } = props;
    const { allOrders } = useSelector(state => state.wsAllOrders);
    const { userOrders } = useSelector(state => state.wsUserOrders);

    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const onOrderCardClick = useCallback((orderData: TOrder) => {
        dispatch(wsShowOrderDetails(orderData));
        dispatch(openOrderDetailsModal());

        const pathname = mode === 'feed'
            ? `/feed/${orderData._id}`
            : `/profile/orders/${orderData._id}`;
        history.push({ pathname, state: { background: location} });
    }, [dispatch, mode, history, location]);

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
            {
                mode === 'feed' ? (
                    <div className={styles.ordersWrapper}>
                        {
                            allOrders.length && allOrders.map(order => (
                                <OrderCard
                                    key={order._id}
                                    mode={mode}
                                    orderData={order}
                                    onClick={onOrderCardClick}
                                />
                            ))
                        }
                    </div>
                ) : (
                    <div className={styles.ordersWrapper}>
                        {
                            userOrders.length && userOrders.map(order => (
                                <OrderCard
                                    key={order._id}
                                    mode={mode}
                                    orderData={order}
                                    onClick={onOrderCardClick}
                                />
                            ))
                        }
                    </div>
                )
            }
        </section>
    );
};

OrdersList.defaultProps = { mode: 'feed' };

export default OrdersList;
