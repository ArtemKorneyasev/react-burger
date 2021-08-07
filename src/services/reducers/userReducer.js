import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_ERROR,
    CLEAR_USER_REGISTER_ERROR,

    USER_LOGIN_REQUEST,
    USER_LOGIN_ERROR,
    CLEAR_USER_LOGIN_ERROR,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_ERROR,
    CLEAR_USER_LOGOUT_ERROR,

    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_ERROR,
    CLEAR_USER_FORGOT_PASSWORD_ERROR,

    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_ERROR,
    CLEAR_USER_RESET_PASSWORD_ERROR,

    USER_LOAD_DATA_REQUEST,
    USER_LOAD_DATA_ERROR,
    CLEAR_USER_LOAD_DATA_ERROR,

    USER_SAVE_DATA_REQUEST,
    USER_SAVE_DATA_ERROR,
    CLEAR_USER_SAVE_DATA_ERROR,
} from '../actions/userActions';
import { setCookie, deleteCookie } from '../helpers';

const initialState = {
    user: {
        email: '',
        name: '',
    },

    userRegisterSuccess: false,
    userRegisterError: '',

    userLoginSuccess: false,
    userLoginError: '',

    userLogoutSuccess: false,
    userLogoutError: '',

    userForgotPasswordSuccess: false,
    userForgotPasswordError: '',

    userResetPasswordSuccess: false,
    userResetPasswordError: '',

    userLoadSuccess: false,
    userLoadError: '',

    userSaveSuccess: false,
    userSaveError: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            setCookie('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);

            return {
                ...state,
                user: action.payload.user,
                userRegisterSuccess: action.payload.success,
                userLoginSuccess: true,
                userLogoutSuccess: false,
            };
        case USER_REGISTER_ERROR:
            return {
                ...state,
                userRegisterError: action.payload,
            };
        case CLEAR_USER_REGISTER_ERROR:
            return {
                ...state,
                userRegisterError: '',
            };
        case USER_LOGIN_REQUEST:
            setCookie('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);

            return {
                ...state,
                user: action.payload.user,
                userLoginSuccess: action.payload.success,
                userLogoutSuccess: false,
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                userLoginError: action.payload,
            };
        case CLEAR_USER_LOGIN_ERROR:
            return {
                ...state,
                userLoginError: '',
            };
        case USER_LOGOUT_REQUEST:
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');

            return {
                ...state,
                user: {
                    email: '',
                    name: '',
                },
                userRegisterSuccess: false,
                userLoginSuccess: false,
                userLogoutSuccess: action.payload.success,
                userForgotPasswordSuccess: false,
                userResetPasswordSuccess: false,
                userLoadSuccess: false,
                userSaveSuccess: false,
            };
        case USER_LOGOUT_ERROR:
            return {
                ...state,
                userLogoutError: action.payload,
            };
        case CLEAR_USER_LOGOUT_ERROR:
            return {
                ...state,
                userLogoutError: '',
            };
        case USER_FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                userForgotPasswordSuccess: action.payload.success,
            };
        case USER_FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                userForgotPasswordError: action.payload,
            };
        case CLEAR_USER_FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                userForgotPasswordError: '',
            };
        case USER_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                userResetPasswordSuccess: action.payload.success,
            };
        case USER_RESET_PASSWORD_ERROR:
            return {
                ...state,
                userResetPasswordError: action.payload,
            };
        case CLEAR_USER_RESET_PASSWORD_ERROR:
            return {
                ...state,
                userResetPasswordError: '',
            };
        case USER_LOAD_DATA_REQUEST:
            return {
                ...state,
                user: action.payload.user,
                userLoadSuccess: action.payload.success,
            };
        case USER_LOAD_DATA_ERROR:
            return {
                ...state,
                userLoadError: action.payload,
            };
        case CLEAR_USER_LOAD_DATA_ERROR:
            return {
                ...state,
                userLoadError: '',
            };
        case USER_SAVE_DATA_REQUEST:
            return {
                ...state,
                user: action.payload.user,
                userSaveSuccess: action.payload.success,
            };
        case USER_SAVE_DATA_ERROR:
            return {
                ...state,
                userSaveError: action.payload,
            };
        case CLEAR_USER_SAVE_DATA_ERROR:
            return {
                ...state,
                userSaveError: '',
            };
        default:
            return state;
    }
};

export default userReducer;
