import {
    MAKE_ORDER,
	ORDER_ERROR,
	CLEAR_ORDER_RESULT,
	CLEAR_ORDER_ERROR,

	ORDERS_FETCH,
	ORDERS_FETCH_ERROR,
	CLEAR_ORDERS_FETCH_ERROR,

	SHOW_ORDER_DETAILS,
	CLEAR_ORDER_DETAILS,
} from '../actions/orderActions';

const initialState = {
    orderResult: {},
	orderError: '',
	orders: [],
	ordersTotal: 0,
	ordersTotalToday: 0,
	ordersFetchError: '',
	orderDetails: {},
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case MAKE_ORDER:
			return {
				...state,
				orderResult: action.payload,
			};
		case ORDER_ERROR:
			return {
				...state,
				orderError: action.payload,
			};
		case CLEAR_ORDER_RESULT:
			return {
				...state,
				orderResult: {},
			};
		case CLEAR_ORDER_ERROR:
			return {
				...state,
				orderError: '',
			};
		case ORDERS_FETCH:
			return {
				...state,
				orders: action.payload.orders,
				ordersTotal: action.payload.total,
				ordersTotalToday: action.payload.totalToday,
			};
		case ORDERS_FETCH_ERROR:
			return {
				...state,
				ordersFetchError: action.payload,
			};
		case CLEAR_ORDERS_FETCH_ERROR:
			return {
				...state,
				ordersFetchError: '',
			};
		case SHOW_ORDER_DETAILS:
			return {
				...state,
				orderDetails: action.payload,
			};
		case CLEAR_ORDER_DETAILS:
			return {
				...state,
				orderDetails: {},
			};
		default:
			return state;
	}
};

export default orderReducer;
