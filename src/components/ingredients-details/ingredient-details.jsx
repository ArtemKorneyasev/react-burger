import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = (props: Props) => {
    const { data } = props;

    return (
        <>
            <img style={{ height: 240 }} src={data.image_large} alt={data.name} />
            <span
                style={{ marginTop: 16, marginBottom: 32 }}
                className="text text_type_main-medium"
            >
                {data.name}
            </span>
            <div className={styles.calorificСapacity}>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Калории,ккал
                    </span>
                    <span className="text text_type_digits-default">
                        {data.calories}
                    </span>
                </div>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Белки,г
                    </span>
                    <span className="text text_type_digits-default">
                        {data.proteins}
                    </span>
                </div>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Жиры,г
                    </span>
                    <span className="text text_type_digits-default">
                        {data.fat}
                    </span>
                </div>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Углеводы,г
                    </span>
                    <span className="text text_type_digits-default">
                        {data.carbohydrates}
                    </span>
                </div>
            </div>
        </>
    );
};

IngredientDetails.propTypes = {
    data: PropTypes.shape({
        _id: PropTypes.string,
        name: PropTypes.string,
        type: PropTypes.string,
        proteins: PropTypes.number,
        fat: PropTypes.number,
        carbohydrates: PropTypes.number,
        calories: PropTypes.number,
        price: PropTypes.number,
        image: PropTypes.string,
        image_mobile: PropTypes.string,
        image_large: PropTypes.string,
        __v: PropTypes.number,
    }).isRequired,
};

export default IngredientDetails;
