import { getIngredientsRequest } from '../../api';

export const INGREDIENTS_REQUEST = 'INGREDIENTS_REQUEST';
export const INGREDIENTS_REQUEST_SUCCESS = 'INGREDIENTS_REQUEST_SUCCESS';
export const INGREDIENTS_REQUSET_FAILED = 'INGREDIENTS_REQUSET_FAILED';

export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';
export const CLEAR_INGREDIENT_INFO = 'CLEAR_INGREDIENT_INFO';

export const getIngredients = () => {
    return dispatch => {
        dispatch({ type: INGREDIENTS_REQUEST });
        getIngredientsRequest().then(response => {
            if (response && response.success) {
                dispatch({
                    type: INGREDIENTS_REQUEST_SUCCESS,
                    payload: response.data,
                });
            }
        }).catch(() => {
            dispatch({
                type: INGREDIENTS_REQUSET_FAILED,
                payload: 'Ошибка получения данных...',
            });
        });
    };
};

export const showIngredientInfo = data => {
    return {
        type: SHOW_INGREDIENT_INFO,
        payload: data,
    };
};

export const clearIngredientInfo = () => {
    return { type: CLEAR_INGREDIENT_INFO };
};
