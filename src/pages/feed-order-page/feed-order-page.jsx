import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/order-details/order-details';
import styles from './feed-order-page.module.css';

const FeedOrderPage = () => {
    const { orders } = useSelector(state => state.order);
    const { id } = useParams();
    let orderDetails = null;

    if (orders.length) {
        orderDetails = orders.find(item => item._id === id);
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
