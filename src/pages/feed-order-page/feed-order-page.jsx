import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/order-details/order-details';
import styles from './feed-order-page.module.css';

const FeedOrderPage = () => {
    const { allOrders } = useSelector(state => state.wsAllOrders);
    const { id } = useParams();
    let orderDetails = null;

    if (allOrders.length) {
        orderDetails = allOrders.find(item => item._id === id);
    }

    return (
        <div className={styles.root}>
            {
                orderDetails ? (
                    <OrderDetails orderDetails={orderDetails} />
                ) : null
            }
        </div>
    );
};

export default FeedOrderPage;
