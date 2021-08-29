import Loader from 'react-loader-spinner';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { wsAllOrdersConnectionStart } from '../../services/redux/actions/wsAllOrdersActions';
import OrdersList from '../../components/orders-list/orders-list';
import styles from './feed-page.module.css';

const FeedPage = () => {
    const {
        wsAllOrdersConnected,
        allOrders,
        ordersTotal,
        ordersTotalToday,
    } = useSelector(state => state.wsAllOrders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(wsAllOrdersConnectionStart());
    }, [dispatch]);

    if (!wsAllOrdersConnected) {
        return (
            <div className={styles.loading}>
                <Loader
                    type="Puff"
                    color="#8585ad"
                    height={100}
                    width={100}
                />
            </div>
        );
    }

    return (
        <main className={styles.main}>
            <OrdersList />
            <section className={styles.detailsSection}>
                <div className={styles.ordersStatus}>
                    <div className={styles.column}>
                        <div
                            className={`text text_type_main-medium ${styles.subtitle}`}
                            style={{ marginBottom: 24 }}
                        >
                            Готовы:
                        </div>
                        <div className={styles.orderList}>
                            {
                                allOrders.filter(
                                    order => order.status === 'done',
                                ).slice(0, 10).map(order => (
                                    <span
                                        key={order._id}
                                        className="text text_type_digits-default"
                                        style={{ color: '#00CCCC'}}
                                    >
                                        {`#${order.number}`}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                    <div className={styles.column}>
                        <div
                            className={`text text_type_main-medium ${styles.subtitle}`}
                            style={{ marginBottom: 24 }}
                        >
                            В работе:
                        </div>
                        <div className={styles.orderList}>
                            {
                                allOrders.filter(
                                    order => order.status === 'pending',
                                ).slice(0, 10).map(order => (
                                    <span
                                        key={order._id}
                                        className="text text_type_digits-default"
                                    >
                                        {`#${order.number}`}
                                    </span>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: 60 }}>
                    <div className={`text text_type_main-medium ${styles.subtitle}`}>
                        Выполнено за все время:
                    </div>
                    <div className={`text text_type_digits-large ${styles.count}`}>
                        {ordersTotal}
                    </div>
                </div>
                <div>
                    <div className={`text text_type_main-medium ${styles.subtitle}`}>
                        Выполнено за сегодня:
                    </div>
                    <div className={`text text_type_digits-large ${styles.count}`}>
                        {ordersTotalToday}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default FeedPage;
