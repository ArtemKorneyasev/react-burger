import {
	OPEN_INGREDIENT_MODAL,
	OPEN_ORDER_RESULT_MODAL,
	OPEN_ORDER_DETAILS_MODAL,
	OPEN_USER_REGISTER_MODAL,
	OPEN_USER_LOGIN_MODAL,
	OPEN_USER_LOGOUT_MODAL,
	OPEN_USER_FORGOT_PASSWORD_MODAL,
	OPEN_USER_RESET_PASSWORD_MODAL,
	OPEN_USER_LOAD_MODAL,
	OPEN_USER_SAVE_MODAL,
	CLOSE_MODAL,
} from '../constants/modal';
import { TModalActions } from '../actions/modalActions';

type TModalState = {
	modalMode: string,
	modalIsOpen: boolean,
};

const initialState: TModalState = {
    modalMode: '',
	modalIsOpen: false,
};

const modalReducer = (state = initialState, action: TModalActions): TModalState => {
	switch (action.type) {
		case OPEN_INGREDIENT_MODAL:
			return {
				modalMode: 'ingredient-details',
				modalIsOpen: true,
			};
		case OPEN_ORDER_RESULT_MODAL:
			return {
				modalMode: 'order-result',
				modalIsOpen: true,
			};
		case OPEN_ORDER_DETAILS_MODAL:
			return {
				modalMode: 'order-details',
				modalIsOpen: true,
			};
		case OPEN_USER_REGISTER_MODAL:
			return {
				modalMode: 'register',
				modalIsOpen: true,
			};
		case OPEN_USER_LOGIN_MODAL:
			return {
				modalMode: 'login',
				modalIsOpen: true,
			};
		case OPEN_USER_LOGOUT_MODAL:
			return {
				modalMode: 'logout',
				modalIsOpen: true,
			};
		case OPEN_USER_FORGOT_PASSWORD_MODAL:
			return {
				modalMode: 'forgot-password',
				modalIsOpen: true,
			};
		case OPEN_USER_RESET_PASSWORD_MODAL:
			return {
				modalMode: 'reset-password',
				modalIsOpen: true,
			};
		case OPEN_USER_LOAD_MODAL:
			return {
				modalMode: 'load-user',
				modalIsOpen: true,
			};
		case OPEN_USER_SAVE_MODAL:
			return {
				modalMode: 'save-user',
				modalIsOpen: true,
			};
		case CLOSE_MODAL:
			return {
				modalMode: '',
				modalIsOpen: false,
			};
		default:
			return state;
	}
};

export default modalReducer;
