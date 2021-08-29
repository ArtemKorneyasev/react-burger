import {
    MAKE_ORDER_REQUEST,
	MAKE_ORDER_REQUEST_SUCCESS,
	MAKE_ORDER_REQUEST_ERROR,
	CLEAR_ORDER_RESULT,
	CLEAR_ORDER_ERROR,
} from '../actions/orderActions';

const initialState = {
	inProgress: false,
    orderResult: {},
	orderError: '',
};

const orderReducer = (state = initialState, action) => {
	switch (action.type) {
		case MAKE_ORDER_REQUEST:
			return {
				...state,
				inProgress: true,
			};
		case MAKE_ORDER_REQUEST_SUCCESS:
			return {
				...state,
				inProgress: false,
				orderResult: action.payload,
			};
		case MAKE_ORDER_REQUEST_ERROR:
			return {
				...state,
				inProgress: false,
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
