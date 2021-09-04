import { FC } from 'react';
import { TIngredient } from '../../services/types';
import styles from './ingredient-details.module.css';

interface IProps {
    ingredientInfo: TIngredient | null;
}

const IngredientDetails: FC<IProps> = (props: IProps) => {
    const { ingredientInfo } = props;

    if (!ingredientInfo) {
        return null;
    }

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

export default IngredientDetails;
