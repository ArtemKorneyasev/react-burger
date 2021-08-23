import { getOrderRequest, getOrdersAllRequest } from "../../api";

export const MAKE_ORDER = 'MAKE_ORDER';
export const ORDER_ERROR = 'ORDER_ERROR';
export const CLEAR_ORDER_RESULT = 'CLEAR_ORDER_RESULT';
export const CLEAR_ORDER_ERROR = 'CLEAR_ORDER_ERROR';

export const ORDERS_FETCH = 'ORDERS_FETCH';
export const ORDERS_FETCH_ERROR = 'ORDERS_FETCH_ERROR';
export const CLEAR_ORDERS_FETCH_ERROR = 'CLEAR_ORDERS_FETCH_ERROR';

export const SHOW_ORDER_DETAILS = 'SHOW_ORDER_DETAILS';
export const CLEAR_ORDER_DETAILS = 'CLEAR_ORDER_DETAILS';

export const getOrderResult = burgerData => {
    const { bun } = burgerData;

    return dispatch => {
        if (bun.uniqueId) {
            const requestData = {
                ingredients: Object.keys(burgerData).flatMap(ingredientType => {
                    switch (ingredientType) {
                        case 'bun':
                            return burgerData.bun.data._id;
                        case 'toppings':
                            return burgerData[ingredientType].map(
                                ingredient => ingredient.data._id,
                            );
                        default:
                            return [];
                    }
                }),
            };

            getOrderRequest(requestData).then(response => {
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

export const clearOrderResult = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ORDER_RESULT });
    };
};

export const clearOrderError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ORDER_ERROR });
    };
};

export const getOrders = () => {
    return dispatch => {
        getOrdersAllRequest().then(response => {
            if (response && response.success) {
                dispatch({
                    type: ORDERS_FETCH,
                    payload: response,
                });
            }
        }).catch(() => {
            dispatch({
                type: ORDERS_FETCH_ERROR,
                payload: 'Ошибка получения данных...',
            });
        });
    };
};

export const clearOrdersFetchError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ORDERS_FETCH_ERROR });
    };
};

export const showOrderDetails = data => {
    return dispatch => {
        dispatch({
            type: SHOW_ORDER_DETAILS,
            payload: data,
        });
    };
};

export const clearOrderDetails = () => {
    return dispatch => {
        dispatch({ type: CLEAR_ORDER_DETAILS });
    };
};
