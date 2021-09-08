import {
    MAKE_ORDER_REQUEST,
	MAKE_ORDER_REQUEST_SUCCESS,
	MAKE_ORDER_REQUEST_FAILED,
	CLEAR_ORDER_RESULT,
	CLEAR_ORDER_ERROR,
} from '../constants/order';
import { TOrderActions } from '../actions/orderActions';
import { TMakeOrderResult } from '../../types';

type TOrderState = {
	inProgress: boolean,
	orderResult: TMakeOrderResult | null,
	orderError: string,
};

const initialState: TOrderState = {
	inProgress: false,
    orderResult: null,
	orderError: '',
};

const orderReducer = (state = initialState, action: TOrderActions): TOrderState => {
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
				orderResult: action.orderResult,
			};
		case MAKE_ORDER_REQUEST_FAILED:
			return {
				...state,
				inProgress: false,
				orderError: action.error,
			};
		case CLEAR_ORDER_RESULT:
			return {
				...state,
				orderResult: null,
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
