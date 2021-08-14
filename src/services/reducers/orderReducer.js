import {
    MAKE_ORDER,
	ORDER_ERROR,
	CLEAR_ORDER_DETAILS,
	CLEAR_ORDER_ERROR,
} from '../actions/orderActions';

const initialState = {
    orderResult: {},
	orderError: '',
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
		case CLEAR_ORDER_DETAILS:
			return {
				...state,
				orderResult: {},
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
