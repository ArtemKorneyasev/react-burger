import {
    WS_ALL_ORDERS_CONNECTION_SUCCESS,
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_GET_ALL_ORDERS,
	WS_SHOW_ORDERS_DETAILS,
	WS_CLEAR_ORDERS_DETAILS,
} from '../constants/wsAllOrders';
import { TWsAllOrdersActions } from '../actions/wsAllOrdersActions';
import { TOrder } from '../../types';

type TWsAllOrdersState = {
	wsAllOrdersConnected: boolean,
	allOrders: ReadonlyArray<TOrder>,
	ordersTotal: number,
	ordersTotalToday: number,
	orderDetails: TOrder | null,
};

const initialState: TWsAllOrdersState = {
    wsAllOrdersConnected: false,
	allOrders: [],
	ordersTotal: 0,
	ordersTotalToday: 0,
	orderDetails: null,
};

const wsAllOrdersReducer = (
	state = initialState,
	action: TWsAllOrdersActions,
): TWsAllOrdersState => {
    switch (action.type) {
        case WS_ALL_ORDERS_CONNECTION_SUCCESS:
			return {
				...state,
				wsAllOrdersConnected: true,
			};
        case WS_ALL_ORDERS_CONNECTION_ERROR:
			return {
				...state,
				wsAllOrdersConnected: false,
			};
        case WS_ALL_ORDERS_CONNECTION_CLOSED:
			return {
				...state,
				wsAllOrdersConnected: false,
			};
        case WS_GET_ALL_ORDERS:
			return {
				...state,
				allOrders: action.ordersResult.orders,
				ordersTotal: action.ordersResult.total,
				ordersTotalToday: action.ordersResult.totalToday,
			};
		case WS_SHOW_ORDERS_DETAILS:
			return {
				...state,
				orderDetails: action.order,
			};
		case WS_CLEAR_ORDERS_DETAILS:
			return {
				...state,
				orderDetails: null,
			};
        default:
			return state;
    }
};

export default wsAllOrdersReducer;
