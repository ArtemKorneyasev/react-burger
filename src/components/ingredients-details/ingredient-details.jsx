import PropTypes from 'prop-types';
import styles from './ingredient-details.module.css';

const IngredientDetails = (props) => {
    const { ingredientInfo } = props;

    return (
        <>
            <img
                style={{ height: 240 }}
                src={ingredientInfo.image_large}
                alt={ingredientInfo.name}
            />
            <span
                style={{ marginTop: 16, marginBottom: 32 }}
                className="text text_type_main-medium"
            >
                {ingredientInfo.name}
            </span>
            <div className={styles.calorificСapacity}>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Калории,ккал
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredientInfo.calories}
                    </span>
                </div>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Белки,г
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredientInfo.proteins}
                    </span>
                </div>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Жиры,г
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredientInfo.fat}
                    </span>
                </div>
                <div className={styles.capacity}>
                    <span className="text text_type_main-default">
                        Углеводы,г
                    </span>
                    <span className="text text_type_digits-default">
                        {ingredientInfo.carbohydrates}
                    </span>
                </div>
            </div>
        </>
    );
};

IngredientDetails.propTypes = {
    ingredientInfo: PropTypes.shape({
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
