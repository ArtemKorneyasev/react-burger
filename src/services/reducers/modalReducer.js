import {
	OPEN_INGREDIENT_MODAL,
	OPEN_ORDER_MODAL,
	OPEN_REGISTER_MODAL,
	OPEN_LOGIN_MODAL,
	OPEN_LOGOUT_MODAL,
	OPEN_FORGOT_PASSWORD_MODAL,
	OPEN_RESET_PASSWORD_MODAL,
	CLOSE_MODAL,
} from '../actions/modalActions';

const initialState = {
    modalMode: '',
	modalIsOpen: false,
};

const modalReducer = (state = initialState, action) => {
	switch (action.type) {
		case OPEN_INGREDIENT_MODAL:
			return {
				modalMode: 'ingredient-details',
				modalIsOpen: true,
			};
		case OPEN_ORDER_MODAL:
			return {
				modalMode: 'order-details',
				modalIsOpen: true,
			};
		case OPEN_REGISTER_MODAL:
			return {
				modalMode: 'register',
				modalIsOpen: true,
			};
		case OPEN_LOGIN_MODAL:
			return {
				modalMode: 'login',
				modalIsOpen: true,
			};
		case OPEN_LOGOUT_MODAL:
			return {
				modalMode: 'logout',
				modalIsOpen: true,
			};
		case OPEN_FORGOT_PASSWORD_MODAL:
			return {
				modalMode: 'forgot-password',
				modalIsOpen: true,
			};
		case OPEN_RESET_PASSWORD_MODAL:
			return {
				modalMode: 'reset-password',
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
