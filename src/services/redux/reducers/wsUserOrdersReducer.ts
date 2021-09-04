import {
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS,
} from '../constants/wsUserOrders';
import { TWsUserOrdersActions } from '../actions/wsUserOrdersActions';
import { TOrder } from '../../types';

type TWsUserOrdersState = {
	wsUserOrdersConnected: boolean,
	userOrders: ReadonlyArray<TOrder>,
};

const initialState: TWsUserOrdersState = {
    wsUserOrdersConnected: false,
	userOrders: [],
};

const wsUserOrdersReducer = (
	state = initialState,
	action: TWsUserOrdersActions,
): TWsUserOrdersState => {
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
				userOrders: action.ordersResult.orders || [],
          };
		default:
			return state;
    }
};

export default wsUserOrdersReducer;
