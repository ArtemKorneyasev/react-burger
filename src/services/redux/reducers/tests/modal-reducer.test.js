import modalReducer from '../modalReducer';
import * as types from '../../actions/modalActions';

const initialState = {
    modalMode: '',
	modalIsOpen: false,
};

describe('MODAL REDUCER', () => {
    it('should return the initial state', () => {
        expect(modalReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle OPEN_INGREDIENT_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_INGREDIENT_MODAL,
        })).toEqual({
            modalMode: 'ingredient-details',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_ORDER_RESULT_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_ORDER_RESULT_MODAL,
        })).toEqual({
            modalMode: 'order-result',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_ORDER_DETAILS_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_ORDER_DETAILS_MODAL,
        })).toEqual({
            modalMode: 'order-details',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_USER_REGISTER_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_USER_REGISTER_MODAL,
        })).toEqual({
            modalMode: 'register',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_USER_LOGIN_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_USER_LOGIN_MODAL,
        })).toEqual({
            modalMode: 'login',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_USER_LOGOUT_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_USER_LOGOUT_MODAL,
        })).toEqual({
            modalMode: 'logout',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_USER_FORGOT_PASSWORD_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_USER_FORGOT_PASSWORD_MODAL,
        })).toEqual({
            modalMode: 'forgot-password',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_USER_RESET_PASSWORD_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_USER_RESET_PASSWORD_MODAL,
        })).toEqual({
            modalMode: 'reset-password',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_USER_LOAD_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_USER_LOAD_MODAL,
        })).toEqual({
            modalMode: 'load-user',
            modalIsOpen: true,
        });
    });

    it('should handle OPEN_USER_SAVE_MODAL', () => {
        expect(modalReducer(initialState, {
            type: types.OPEN_USER_SAVE_MODAL,
        })).toEqual({
            modalMode: 'save-user',
            modalIsOpen: true,
        });
    });

    it('should handle CLOSE_MODAL', () => {
        expect(modalReducer({
            modalMode: 'ingredient-details',
            modalIsOpen: true,
        }, {
            type: types.CLOSE_MODAL,
        })).toEqual(initialState);
    });
});
