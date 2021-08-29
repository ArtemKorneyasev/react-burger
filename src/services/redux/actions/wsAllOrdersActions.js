export const WS_ALL_ORDERS_CONNECTION_START = 'WS_ALL_ORDERS_CONNECTION_START';
export const WS_ALL_ORDERS_CONNECTION_SUCCESS = 'WS_ALL_ORDERS_CONNECTION_SUCCESS';
export const WS_ALL_ORDERS_CONNECTION_ERROR = 'WS_ALL_ORDERS_CONNECTION_ERROR';
export const WS_ALL_ORDERS_CONNECTION_CLOSED = 'WS_ALL_ORDERS_CONNECTION_CLOSED';
export const WS_GET_ALL_ORDERS = 'WS_GET_ALL_ORDERS';

export const WS_SHOW_ORDERS_DETAILS = 'WS_SHOW_ORDERS_DETAILS';
export const WS_CLEAR_ORDERS_DETAILS = 'WS_CLEAR_ORDERS_DETAILS';

export const wsAllOrdersConnectionStart = () => {
    return { type: WS_ALL_ORDERS_CONNECTION_START };
};

export const wsAllOrdersConnectionSuccess = () => {
    return { type: WS_ALL_ORDERS_CONNECTION_SUCCESS };
};

export const wsAllOrdersConnectionError = () => {
    return { type: WS_ALL_ORDERS_CONNECTION_ERROR };
};

export const wsAllOrdersConnectionClosed = () => {
    return { type: WS_ALL_ORDERS_CONNECTION_CLOSED };
};

export const wsGetAllOrders = orders => {
    return dispatch => dispatch({
        type: WS_GET_ALL_ORDERS,
        payload: orders,
    });
};

export const wsShowOrderDetails = data => {
    return {
        type: WS_SHOW_ORDERS_DETAILS,
        payload: data,
    };
};

export const wsClearOrderDetails = () => {
    return { type: WS_CLEAR_ORDERS_DETAILS };
};
