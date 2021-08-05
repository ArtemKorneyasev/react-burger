import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_ERROR,
    CLEAR_REGISTER_ERROR,

    USER_LOGIN_REQUEST,
    USER_LOGIN_ERROR,
    CLEAR_LOGIN_ERROR,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_ERROR,
    CLEAR_LOGOUT_ERROR,

    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_ERROR,
    CLEAR_FORGOT_PASSWORD_ERROR,

    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_ERROR,
    CLEAR_RESET_PASSWORD_ERROR,
} from '../actions/userActions';
import { setCookie, deleteCookie } from '../helpers';

const initialState = {
    user: {
        email: '',
        name: '',
    },

    registerSuccess: false,
    registerError: '',

    loginSuccess: false,
    loginError: '',

    logoutSuccess: false,
    logoutError: '',

    forgotPasswordSuccess: false,
    forgotPasswordError: '',

    resetPasswordSuccess: false,
    resetPasswordError: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            setCookie('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);

            return {
                ...state,
                user: {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                },
                registerSuccess: action.payload.success,
            };
        case USER_REGISTER_ERROR:
            return {
                ...state,
                registerError: action.payload,
            };
        case CLEAR_REGISTER_ERROR:
            return {
                ...state,
                registerError: '',
            };
        case USER_LOGIN_REQUEST:
            setCookie('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);

            return {
                ...state,
                user: {
                    email: action.payload.user.email,
                    name: action.payload.user.name,
                },
                loginSuccess: action.payload.success,
            };
        case USER_LOGIN_ERROR:
            return {
                ...state,
                loginError: action.payload,
            };
        case CLEAR_LOGIN_ERROR:
            return {
                ...state,
                loginError: '',
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
                logoutSuccess: action.payload.success,
            };
        case USER_LOGOUT_ERROR:
            return {
                ...state,
                logoutError: action.payload,
            };
        case CLEAR_LOGOUT_ERROR:
            return {
                ...state,
                logoutError: '',
            };
        case USER_FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPasswordSuccess: action.payload.success,
            };
        case USER_FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotPasswordError: action.payload,
            };
        case CLEAR_FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotPasswordError: '',
            };
        case USER_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordSuccess: action.payload.success,
            };
        case USER_RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordError: action.payload,
            };
        case CLEAR_RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordError: '',
            };
        default:
            return state;
    }
};

export default userReducer;
