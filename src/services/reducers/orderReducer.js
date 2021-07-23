import {
    MAKE_ORDER,
	ORDER_ERROR,
	CLEAR_ORDER_DETAILS,
	CLEAR_ORDER_ERROR,
} from '../actions/orderActions';

const initialState = {
    orderDetails: {},
	orderError: '',
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case MAKE_ORDER:
			return {
				...state,
				orderDetails: action.payload,
			};
		case ORDER_ERROR:
			return {
				...state,
				orderError: action.payload,
			};
		case CLEAR_ORDER_DETAILS:
			return {
				...state,
				orderDetails: {},
			};
		case CLEAR_ORDER_ERROR:
			return {
				...state,
				orderError: '',
			};
		default:
			return state;
	}
};

export default orderReducer;
