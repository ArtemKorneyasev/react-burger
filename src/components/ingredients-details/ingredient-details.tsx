import Modal from '../modal/modal';
import type { Ingredient } from '../../types/types';
import styles from './ingredient-details.module.css';

type Props = {
    data: Ingredient,
    onClose: () => void,
};

const IngredientDetails = (props: Props) => {
    const { data, onClose } = props;

    return (
        <Modal
            title="Детали ингредиента"
            onClose={onClose}
        >
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
        </Modal>
    );
};

export default IngredientDetails;
