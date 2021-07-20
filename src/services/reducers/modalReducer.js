import {
	OPEN_INGREDIENT_MODAL,
	OPEN_ORDER_MODAL,
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
			}
		case OPEN_ORDER_MODAL:
			return {
				modalMode: 'order-details',
				modalIsOpen: true,
			}
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
