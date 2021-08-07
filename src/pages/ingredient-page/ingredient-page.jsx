import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import IngredientDetails from '../../components/ingredients-details/ingredient-details';
import styles from './ingredient-page.module.css';

const IngredientPage = () => {
    const { ingredients } = useSelector(state => state.ingredients);
    const { id } = useParams();
    let ingredientInfo = null;

    if (ingredients.length) {
        ingredientInfo = ingredients.find(item => item._id === id);
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
