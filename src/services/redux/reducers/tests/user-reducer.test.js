import userReducer from '../userReducer';
import * as types from '../../actions/userActions';
import { userRegisterResultMock } from './mock';

const initialState = {
    user: {
        email: '',
        name: '',
    },

    userRegisterInProgress: false,
    userRegisterSuccess: false,
    userRegisterError: '',

    userLoginInProgress: false,
    userLoginSuccess: false,
    userLoginError: '',

    userLogoutInProgress: false,
    userLogoutSuccess: false,
    userLogoutError: '',

    userForgotPasswordInProgress: false,
    userForgotPasswordSuccess: false,
    userForgotPasswordError: '',

    userResetPasswordInProgress: false,
    userResetPasswordSuccess: false,
    userResetPasswordError: '',

    userLoadInProgress: false,
    userLoadSuccess: false,
    userLoadError: '',

    userSaveInProgress: false,
    userSaveSuccess: false,
    userSaveError: '',
};

describe('USER REDUCER', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle USER_REGISTER_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.USER_REGISTER_REQUEST,
        })).toEqual({
            ...initialState,
            userRegisterInProgress: true,
        });
    });

    it('should handle USER_REGISTER_REQUEST_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            userRegisterInProgress: true,
        }, {
            type: types.USER_REGISTER_REQUEST_SUCCESS,
            payload: userRegisterResultMock,
        })).toEqual({
            ...initialState,
            user: userRegisterResultMock.user,
            userRegisterInProgress: false,
            userRegisterSuccess: userRegisterResultMock.success,
            userLoginSuccess: true,
            userLogoutSuccess: false,
        });
    });

    it('should handle USER_REGISTER_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userRegisterInProgress: true,
        }, {
            type: types.USER_REGISTER_REQUEST_FAILED,
            payload: 'Such user is already registered',
        })).toEqual({
            ...initialState,
            userRegisterInProgress: false,
            userRegisterError: 'Such user is already registered',
        });
    });

    it('should handle CLEAR_USER_REGISTER_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userRegisterError: 'Such user is already registered',
        }, {
            type: types.CLEAR_USER_REGISTER_REQUEST_FAILED,
        })).toEqual({
            ...initialState,
            userRegisterError: '',
        });
    });

    it('should handle USER_LOGIN_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.USER_LOGIN_REQUEST,
        })).toEqual({
            ...initialState,
            userLoginInProgress: true,
        });
    });

    it('should handle USER_LOGIN_REQUEST_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            userLoginInProgress: true,
        }, {
            type: types.USER_LOGIN_REQUEST_SUCCESS,
            payload: userRegisterResultMock,
        })).toEqual({
            ...initialState,
            user: userRegisterResultMock.user,
            userLoginInProgress: false,
            userLoginSuccess: userRegisterResultMock.success,
            userLogoutSuccess: false,
        });
    });

    it('should handle USER_LOGIN_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userLoginInProgress: true,
        }, {
            type: types.USER_LOGIN_REQUEST_FAILED,
            payload: 'Invalid password',
        })).toEqual({
            ...initialState,
            userLoginInProgress: false,
            userLoginError: 'Invalid password',
        });
    });

    it('should handle CLEAR_USER_LOGIN_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userLoginError: 'Invalid password',
        }, {
            type: types.CLEAR_USER_LOGIN_REQUEST_FAILED,
        })).toEqual({
            ...initialState,
            userLoginError: '',
        });
    });

    it('should handle USER_LOGOUT_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.USER_LOGOUT_REQUEST,
        })).toEqual({
            ...initialState,
            userLogoutInProgress: true,
        });
    });

    it('should handle USER_LOGOUT_REQUEST_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            user: userRegisterResultMock.user,
            userLogoutInProgress: true,
        }, {
            type: types.USER_LOGOUT_REQUEST_SUCCESS,
            payload: {
                success: true,
                message: 'Successful logout',
            },
        })).toEqual({
            ...initialState,
            user: { email: '', name: '' },
            userLogoutInProgress: false,
            userRegisterSuccess: false,
            userLoginSuccess: false,
            userLogoutSuccess: true,
            userForgotPasswordSuccess: false,
            userResetPasswordSuccess: false,
            userLoadSuccess: false,
            userSaveSuccess: false,
        });
    });

    it('should handle USER_LOGOUT_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userLogoutInProgress: true,
        }, {
            type: types.USER_LOGOUT_REQUEST_FAILED,
            payload: 'Invalid token',
        })).toEqual({
            ...initialState,
            userLogoutInProgress: false,
            userLogoutError: 'Invalid token',
        });
    });

    it('should handle CLEAR_USER_LOGOUT_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userLogoutError: 'Invalid token',
        }, {
            type: types.CLEAR_USER_LOGOUT_REQUEST_FAILED,
        })).toEqual({
            ...initialState,
            userLogoutError: '',
        });
    });

    it('should handle USER_FORGOT_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.USER_FORGOT_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            userForgotPasswordInProgress: true,
        });
    });

    it('should handle USER_FORGOT_PASSWORD_REQUEST_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            userForgotPasswordInProgress: true,
        }, {
            type: types.USER_FORGOT_PASSWORD_REQUEST_SUCCESS,
            payload: {
                success: true,
                message: 'Reset email sent',
            },
        })).toEqual({
            ...initialState,
            userForgotPasswordInProgress: false,
            userForgotPasswordSuccess: true,
        });
    });

    it('should handle USER_FORGOT_PASSWORD_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userForgotPasswordInProgress: true,
        }, {
            type: types.USER_FORGOT_PASSWORD_REQUEST_FAILED,
            payload: 'Server temporary unavailable',
        })).toEqual({
            ...initialState,
            userForgotPasswordInProgress: false,
            userForgotPasswordError: 'Server temporary unavailable',
        });
    });

    it('should handle CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userForgotPasswordError: 'Server temporary unavailable',
        }, {
            type: types.CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED,
        })).toEqual({
            ...initialState,
            userForgotPasswordError: '',
        });
    });

    it('should handle USER_RESET_PASSWORD_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.USER_RESET_PASSWORD_REQUEST,
        })).toEqual({
            ...initialState,
            userResetPasswordInProgress: true,
        });
    });

    it('should handle USER_RESET_PASSWORD_REQUEST_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            userResetPasswordInProgress: true,
        }, {
            type: types.USER_RESET_PASSWORD_REQUEST_SUCCESS,
            payload: {
                success: true,
                message: 'Password successfully reset',
            },
        })).toEqual({
            ...initialState,
            userResetPasswordInProgress: false,
            userResetPasswordSuccess: true,
        });
    });

    it('should handle USER_RESET_PASSWORD_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userResetPasswordInProgress: true,
        }, {
            type: types.USER_RESET_PASSWORD_REQUEST_FAILED,
            payload: 'Incorrect reset token',
        })).toEqual({
            ...initialState,
            userResetPasswordInProgress: false,
            userResetPasswordError: 'Incorrect reset token',
        });
    });

    it('should handle CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userResetPasswordError: 'Incorrect reset token',
        }, {
            type: types.CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED,
        })).toEqual({
            ...initialState,
            userResetPasswordError: '',
        });
    });

    it('should handle USER_LOAD_DATA_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.USER_LOAD_DATA_REQUEST,
        })).toEqual({
            ...initialState,
            userLoadInProgress: true,
        });
    });

    it('should handle USER_LOAD_DATA_REQUEST_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            userLoadInProgress: true,
        }, {
            type: types.USER_LOAD_DATA_REQUEST_SUCCESS,
            payload: {
                success: true,
                user: {
                    email: 'artemkorneyasev@gmail.com',
                    name: 'Artem Korneyasev',
                },
            },
        })).toEqual({
            ...initialState,
            user: {
                email: 'artemkorneyasev@gmail.com',
                name: 'Artem Korneyasev',
            },
            userLoadInProgress: false,
            userLoadSuccess: true,
        });
    });

    it('should handle USER_LOAD_DATA_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userLoadInProgress: true,
        }, {
            type: types.USER_LOAD_DATA_REQUEST_FAILED,
            payload: 'jwt expared',
        })).toEqual({
            ...initialState,
            userLoadInProgress: false,
            userLoadError: 'jwt expared',
        });
    });

    it('should handle CLEAR_USER_LOAD_DATA_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userLoadError: 'jwt expared',
        }, {
            type: types.CLEAR_USER_LOAD_DATA_REQUEST_FAILED,
        })).toEqual({
            ...initialState,
            userLoadError: '',
        });
    });

    it('should handle USER_SAVE_DATA_REQUEST', () => {
        expect(userReducer(initialState, {
            type: types.USER_SAVE_DATA_REQUEST,
        })).toEqual({
            ...initialState,
            userSaveInProgress: true,
        });
    });

    it('should handle USER_SAVE_DATA_REQUEST_SUCCESS', () => {
        expect(userReducer({
            ...initialState,
            userSaveInProgress: true,
        }, {
            type: types.USER_SAVE_DATA_REQUEST_SUCCESS,
            payload: {
                success: true,
                user: {
                    email: 'artemkorneyasev@gmail.com',
                    name: 'artemkorneyasev',
                },
            },
        })).toEqual({
            ...initialState,
            user: {
                email: 'artemkorneyasev@gmail.com',
                name: 'artemkorneyasev',
            },
            userSaveInProgress: false,
            userSaveSuccess: true,
        });
    });

    it('should handle USER_SAVE_DATA_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userSaveInProgress: true,
        }, {
            type: types.USER_SAVE_DATA_REQUEST_FAILED,
            payload: 'Server temporary unavailable',
        })).toEqual({
            ...initialState,
            userSaveInProgress: false,
            userSaveError: 'Server temporary unavailable',
        });
    });

    it('should handle CLEAR_USER_SAVE_DATA_REQUEST_FAILED', () => {
        expect(userReducer({
            ...initialState,
            userSaveError: 'Server temporary unavailable',
        }, {
            type: types.CLEAR_USER_SAVE_DATA_REQUEST_FAILED,
        })).toEqual({
            ...initialState,
            userSaveError: '',
        });
    });
});
