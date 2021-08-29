import {
    MAKE_ORDER,
	ORDER_ERROR,
	CLEAR_ORDER_RESULT,
	CLEAR_ORDER_ERROR,
} from '../actions/orderActions';

const initialState = {
    orderResult: {},
	orderError: '',
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case MAKE_ORDER:
			console.log('order result:', action.payload);
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
		default:
			return state;
	}
};

export default orderReducer;
