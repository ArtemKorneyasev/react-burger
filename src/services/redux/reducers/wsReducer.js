import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
} from '../actions/wsActions';

const initialState = {
    wsConnected: false,
    orders: [],
    ordersTotal: 0,
	ordersTotalToday: 0,
};

const wsReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_CONNECTION_SUCCESS:
          return {
            ...state,
            wsConnected: true
          };

        case WS_CONNECTION_ERROR:
          return {
            ...state,
            wsConnected: false
          };

        case WS_CONNECTION_CLOSED:
          return {
            ...state,
            wsConnected: false
          };

        case WS_GET_ORDERS:
          return {
            ...state,
            orders: action.payload.orders,
            ordersTotal: action.payload.total,
            ordersTotalToday: action.payload.totalToday,
          };
        default:
          return state;
    }
};

export default wsReducer;
