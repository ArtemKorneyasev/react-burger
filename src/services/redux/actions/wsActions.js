export const WS_CONNECTION_START = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS = 'WS_GET_ORDERS';
export const WS_SEND_ORDERS_REQUEST = 'WS_SEND_ORDERS_REQUEST';

export const wsConnectionStart = () => {
    return dispatch => dispatch({ type: WS_CONNECTION_START });
};

export const wsConnectionSuccess = () => {
    return dispatch => dispatch({ type: WS_CONNECTION_SUCCESS });
};

export const wsConnectionError = () => {
    return dispatch => dispatch({ type: WS_CONNECTION_ERROR });
};

export const wsConnectionClosed = () => {
    return dispatch => dispatch({ type: WS_CONNECTION_CLOSED });
};

export const wsGetOrders = (orders) => {
    return dispatch => dispatch({
        type: WS_GET_ORDERS,
        payload: orders,
    });
};

export const wsSendOrdersRequest = (token) => {
    return dispatch => dispatch({
        type: WS_SEND_ORDERS_REQUEST,
        payload: token,
    });
};
