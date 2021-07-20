export const ADD_BUN = 'ADD_BUN';
export const ADD_TOPPING = 'ADD_TOPPING';
export const DELETE_TOPPING = 'DELETE_TOPPING';
export const SORT_TOPPINGS = 'SORT_TOPPINGS';
export const CALC_TOTAL_PRICE = 'CALC_TOTAL_PRICE';

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
        dispatch({
            type: DELETE_TOPPING,
            payload: index,
        });
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
