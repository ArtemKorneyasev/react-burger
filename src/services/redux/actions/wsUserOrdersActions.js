export const WS_USER_ORDERS_CONNECTION_START = 'WS_USER_ORDERS_CONNECTION_START';
export const WS_USER_ORDERS_CONNECTION_SUCCESS = 'WS_USER_ORDERS_CONNECTION_SUCCESS';
export const WS_USER_ORDERS_CONNECTION_ERROR = 'WS_USER_ORDERS_CONNECTION_ERROR';
export const WS_USER_ORDERS_CONNECTION_CLOSED = 'WS_USER_ORDERS_CONNECTION_CLOSED';
export const WS_GET_USER_ORDERS = 'WS_GET_USER_ORDERS';

export const wsUserOrdersConnectionStart = () => {
    return { type: WS_USER_ORDERS_CONNECTION_START };
};

export const wsUserOrdersConnectionSuccess = () => {
    return { type: WS_USER_ORDERS_CONNECTION_SUCCESS };
};

export const wsUserOrdersConnectionError = () => {
    return { type: WS_USER_ORDERS_CONNECTION_ERROR };
};

export const wsUserOrdersConnectionClosed = () => {
    return { type: WS_USER_ORDERS_CONNECTION_CLOSED };
};

export const wsGetUserOrders = orders => {
    return dispatch => dispatch({
        type: WS_GET_USER_ORDERS,
        payload: orders,
    });
};
