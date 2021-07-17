import { getIngredientsRequest, getOrderDetailsRequest } from '../api';

export const INGREDIENTS_FETCH = 'INGREDIENTS_FETCH';
export const INGREDIENTS_ERROR = 'INGREDIENTS_ERROR';
export const SHOW_INGREDIENT_INFO = 'SHOW_INGREDIENT_INFO';
export const ADD_BUN = 'ADD_BUN';
export const ADD_TOPPING = 'ADD_TOPPING';
export const DELETE_TOPPING = 'DELETE_TOPPING';
export const SORT_TOPPINGS = 'SORT_TOPPINGS';
export const MAKE_ORDER = 'MAKE_ORDER';
export const ORDER_ERROR = 'ORDER_ERROR';
export const CALC_TOTAL_PRICE = 'CALC_TOTAL_PRICE';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const getIngredients = () => {
    return dispatch => {
        getIngredientsRequest().then(response => {
            if (response && response.success) {
                dispatch({
                    type: INGREDIENTS_FETCH,
                    payload: response.data,
                });
            } else {
                dispatch({
                    type: INGREDIENTS_ERROR,
                    payload: 'Ошибка получения данных...',
                });
            }
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

export const addIngredient = data => {
    return dispatch => {
        switch (data.type) {
            case 'bun':
                dispatch({ type: ADD_BUN, payload: data });
                break;
            case 'sauce':
            case 'main':
                dispatch({ type: ADD_TOPPING, payload: data });
                break;
            default:
                break;
        }
    };
};

export const deleteTopping = index => {
    return dispatch => {
        dispatch({ type: DELETE_TOPPING, payload: index });
    };
};

export const sortToppings = (index, atIndex) => {
    return dispatch => {
        dispatch({
            type: SORT_TOPPINGS,
            payload: { index, atIndex },
        });
    };
};

export const getOrderDetails = burgerData => {
    const { bun } = burgerData;

    return dispatch => {
        if (bun._id) {
            const requestData = {
                ingredients: Object.keys(burgerData).flatMap(ingredientType => {
                    switch (ingredientType) {
                        case 'bun':
                            return burgerData.bun._id;
                        case 'toppings':
                            return burgerData[ingredientType].map(
                                ingredient => ingredient._id,
                            );
                        default:
                            return [];
                    }
                }),
            };

            getOrderDetailsRequest(requestData).then(response => {
                if (response && response.success) {
                    dispatch({
                        type: MAKE_ORDER,
                        payload: response,
                    });
                } else {
                    dispatch({
                        type: ORDER_ERROR,
                        payload: 'Ошибка получения данных...',
                    });
                }
            });
        } else {
            dispatch({
                type: ORDER_ERROR,
                payload: 'Должна быть выбрана булка для бургера!',
            });
        }
    };
};

export const getTotalPrice = burgerData => {
    const { bun, toppings } = burgerData;
    const bunsPrice = bun.price * 2 || 0;
    const toppingsPrice = toppings.reduce((total, current) => {
        return total + current.price;
    }, 0);

    return dispatch => dispatch({
        type: CALC_TOTAL_PRICE,
        payload: (bunsPrice + toppingsPrice),
    });
};

export const closeModal = () => {
    return dispatch => dispatch({ type: CLOSE_MODAL });
};
