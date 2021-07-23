import { getOrderDetailsRequest } from "../api";

export const MAKE_ORDER = 'MAKE_ORDER';
export const ORDER_ERROR = 'ORDER_ERROR';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';
export const CLEAR_ORDER_ERROR = 'CLEAR_ORDER_ERROR';

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
                    dispatch({ type: MAKE_ORDER, payload: response });
                }
            }).catch(() => {
                dispatch({
                    type: ORDER_ERROR,
                    payload: 'Ошибка получения данных...',
                });
            });
        } else {
            dispatch({
                type: ORDER_ERROR,
                payload: 'Должна быть выбрана булка для бургера!',
            });
        }
    };
};

export const clearOrderDetails = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ORDER_DETAILS });
    };
};

export const clearOrderError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ORDER_ERROR });
    };
};
