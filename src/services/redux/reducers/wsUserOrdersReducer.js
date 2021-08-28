import {
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS,
} from '../actions/wsUserOrdersActions';

const initialState = {
    wsUserOrdersConnected: false,
	userOrders: [],
};

const wsUserOrdersReducer = (state = initialState, action) => {
    switch (action.type) {
        case WS_USER_ORDERS_CONNECTION_SUCCESS:
			return {
				...state,
				wsUserOrdersConnected: true,
			};
        case WS_USER_ORDERS_CONNECTION_ERROR:
			return {
				...state,
				wsUserOrdersConnected: false,
			};
        case WS_USER_ORDERS_CONNECTION_CLOSED:
			return {
				...state,
				wsUserOrdersConnected: false,
			};
        case WS_GET_USER_ORDERS:
			return {
				...state,
				userOrders: action.payload.orders || [],
          };
		default:
			return state;
    }
};

export default wsUserOrdersReducer;
