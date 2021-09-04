import { FC } from 'react';
import { useSelector } from '../../services/redux/hooks';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredients-details/ingredient-details';
import { TIngredient } from '../../services/types';
import styles from './ingredient-page.module.css';

interface IParams {
    id: string;
}

const IngredientPage: FC = () => {
    const { ingredients } = useSelector(state => state.ingredients);
    const { id } = useParams<IParams>();
    let ingredientInfo: TIngredient | null = null;

    if (ingredients.length) {
        ingredientInfo = ingredients.find(item => item._id === id) || null;
    }

    return (
        <div className={styles.root}>
            <span className='text text_type_main-large'>
                Детали ингредиента
            </span>
            {
                ingredientInfo ? (
                    <IngredientDetails ingredientInfo={ingredientInfo} />
                ) : null
            }
        </div>
    );
};

export default IngredientPage;
