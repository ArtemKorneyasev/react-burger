import { getOrderRequest } from "../../api";

export const MAKE_ORDER = 'MAKE_ORDER';
export const ORDER_ERROR = 'ORDER_ERROR';
export const CLEAR_ORDER_RESULT = 'CLEAR_ORDER_RESULT';
export const CLEAR_ORDER_ERROR = 'CLEAR_ORDER_ERROR';

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
    return { type: CLEAR_ORDER_RESULT };
};

export const clearOrderError = () => {
    return { type: CLEAR_ORDER_ERROR };
};
