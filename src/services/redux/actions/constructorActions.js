export const ADD_BUN = 'ADD_BUN';
export const ADD_TOPPING = 'ADD_TOPPING';
export const DELETE_TOPPING = 'DELETE_TOPPING';
export const SORT_TOPPINGS = 'SORT_TOPPINGS';
export const CLEAR_BURGER_CONSTRUCTOR = 'CLEAR_BURGER_CONSTRUCTOR';
export const CALC_TOTAL_PRICE = 'CALC_TOTAL_PRICE';

export const addIngredient = ingredientData => {
    const { data } = ingredientData;

    switch (data.type) {
        case 'bun':
            return {
                type: ADD_BUN,
                payload: ingredientData,
            };
        case 'sauce':
        case 'main':
            return {
                type: ADD_TOPPING,
                payload: ingredientData,
            };
        default:
            break;
    }
};

export const deleteTopping = index => {
    return {
        type: DELETE_TOPPING,
        payload: index,
    };
};

export const sortToppings = (dragIndex, hoverIndex) => {
    return {
        type: SORT_TOPPINGS,
        payload: { dragIndex, hoverIndex },
    };
};

export const clearBurgerConstructor = () => {
    return { type: CLEAR_BURGER_CONSTRUCTOR };
};

export const getTotalPrice = burgerData => {
    const { bun, toppings } = burgerData;
    const bunsPrice = bun.data ? bun.data.price * 2 : 0;
    const toppingsPrice = toppings.reduce((total, current) => {
        return total + current.data.price;
    }, 0);

    return {
        type: CALC_TOTAL_PRICE,
        payload: (bunsPrice + toppingsPrice),
    };
};
