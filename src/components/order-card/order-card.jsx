import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { getFormattedDate, getOrderStatus, getTotalPrice } from '../../services/helpers';
import styles from './order-card.module.css';

const OrderCard = (props) => {
    const { mode, orderData, onClick } = props;
    const { ingredients } = useSelector(state => state.ingredients);
    const orderIngredientsUnique = Array.from(new Set(orderData.ingredients));

    return (
        <div
            className={styles.root}
            onClick={() => onClick(orderData)}
        >
            <header className={styles.header}>
                <span className={`text text_type_digits-default ${styles.orderId}`}>
                    {`#${orderData.number}`}
                </span>
                <span className={`text text_type_main-default text_color_inactive ${styles.timestamp}`}>
                    {getFormattedDate(orderData.createdAt)}
                </span>
            </header>
            <span className="text text_type_main-medium">
                {orderData.name}
            </span>
            {
                mode === 'profile' ? (
                    <div className="text text_type_main-default">
                        <span
                            className={orderData.status === 'done' ? styles.doneStatus : null}
                        >
                            {getOrderStatus(orderData.status)}
                        </span>
                    </div>
                ) : null
            }
            <div className={styles.ingredientsContainer}>
                <div className={styles.ingredientsGallery}>
                    {
                        orderIngredientsUnique.slice(0,5).map((orderIngredientId, index) => (
                            <div
                                key={index}
                                className={styles.ingredient}
                                style={{ zIndex: 5 - index }}
                            >
                                <img
                                    src={ingredients.find(ingredient =>
                                        ingredient._id === orderIngredientId,
                                    ).image_mobile}
                                    alt="ingredient"
                                />
                            </div>
                        ))
                    }
                    {
                        orderIngredientsUnique.slice(5,).length ? (
                            <div className={styles.restIngredients}>
                                <div style={{ opacity: 0.6 }} className={styles.ingredient}>
                                    <img
                                        src={ingredients.find(ingredient =>
                                                ingredient._id === orderIngredientsUnique[5],
                                        ).image_mobile}
                                        alt="restIngredients"
                                    />
                                </div>
                                <span className={`text text_type_digits-default ${styles.counter}`}>
                                    {`+${orderIngredientsUnique.slice(5,).length}`}
                                </span>
                            </div>
                        ) : null
                    }
                </div>
                <span className="text text_type_digits-medium">
                    {getTotalPrice(ingredients, orderData)}
                    &nbsp;
                    <CurrencyIcon type="primary" />
                </span>
            </div>
        </div>
    );
};

OrderCard.defaultProps = { mode: 'feed' };
OrderCard.propTypes = {
    mode: PropTypes.string.isRequired,
    orderData: PropTypes.shape({
        createdAt: PropTypes.string,
        ingredients: PropTypes.arrayOf(PropTypes.string),
        name: PropTypes.string,
        number: PropTypes.number,
        status: PropTypes.string,
        updatedAt: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default OrderCard;
