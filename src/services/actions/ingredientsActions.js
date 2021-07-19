import { getIngredientsRequest } from '../api';

export const INGREDIENTS_FETCH = 'INGREDIENTS_FETCH';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';
export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';

export const getIngredients = () => {
    return dispatch => {
        getIngredientsRequest().then(response => {
            if (response && response.success) {
                dispatch({
                    type: INGREDIENTS_FETCH,
                    payload: response.data,
                });
            }
        }).catch(() => {
            dispatch({
                type: INGREDIENTS_ERROR,
                payload: 'Ошибка получения данных...',
            });
        });
    };
};

export const showIngredientInfo = data => {
    return dispatch => {
        dispatch({
            type: SHOW_INGREDIENT_INFO,
            payload: data,
        });
    };
};
