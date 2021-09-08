import { FC } from 'react';
import { useSelector } from '../../services/redux/hooks';
import { useParams } from 'react-router-dom';
import OrderDetails from '../../components/order-details/order-details';
import { TOrder } from '../../services/types';
import styles from './feed-order-page.module.css';

interface IParams {
    id: string;
}

const FeedOrderPage: FC = () => {
    const { allOrders } = useSelector(state => state.wsAllOrders);
    const { userOrders } = useSelector(state => state.wsUserOrders);
    const mergedOrders = Array.from(new Set([...allOrders, ...userOrders]));
    const { id } = useParams<IParams>();
    let orderDetails: TOrder | null = null;

    if (mergedOrders.length) {
        orderDetails = mergedOrders.find(item => item._id === id) || null;
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
