import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_REQUEST_SUCCESS,
    USER_REGISTER_REQUEST_FAILED,
    CLEAR_USER_REGISTER_REQUEST_FAILED,

    USER_LOGIN_REQUEST,
    USER_LOGIN_REQUEST_SUCCESS,
    USER_LOGIN_REQUEST_FAILED,
    CLEAR_USER_LOGIN_REQUEST_FAILED,

    USER_LOGOUT_REQUEST,
    USER_LOGOUT_REQUEST_SUCCESS,
    USER_LOGOUT_REQUEST_FAILED,
    CLEAR_USER_LOGOUT_REQUEST_FAILED,

    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_REQUEST_SUCCESS,
    USER_FORGOT_PASSWORD_REQUEST_FAILED,
    CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED,
    CLEAR_USER_FORGOT_PASSWORD_RESULT,

    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_REQUEST_SUCCESS,
    USER_RESET_PASSWORD_REQUEST_FAILED,
    CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED,

    USER_LOAD_DATA_REQUEST,
    USER_LOAD_DATA_REQUEST_SUCCESS,
    USER_LOAD_DATA_REQUEST_FAILED,
    CLEAR_USER_LOAD_DATA_REQUEST_FAILED,

    USER_SAVE_DATA_REQUEST,
    USER_SAVE_DATA_REQUEST_SUCCESS,
    USER_SAVE_DATA_REQUEST_FAILED,
    CLEAR_USER_SAVE_DATA_REQUEST_FAILED,
} from '../constants/user';
import { TUserActions } from '../actions/userActions';
import { TUSer } from '../../types';
import { setCookie, deleteCookie } from '../../helpers';

type TUserState = {
    user: TUSer,

    userRegisterInProgress: boolean,
    userRegisterSuccess: boolean,
    userRegisterError: string,

    userLoginInProgress: boolean,
    userLoginSuccess: boolean,
    userLoginError: string,

    userLogoutInProgress: boolean,
    userLogoutSuccess: boolean,
    userLogoutError: string,

    userForgotPasswordInProgress: boolean,
    userForgotPasswordSuccess: boolean,
    userForgotPasswordError: string,

    userResetPasswordInProgress: boolean,
    userResetPasswordSuccess: boolean,
    userResetPasswordError: string,

    userLoadInProgress: boolean,
    userLoadSuccess: boolean,
    userLoadError: string,

    userSaveInProgress: boolean,
    userSaveSuccess: boolean,
    userSaveError: string,
};

const initialState: TUserState = {
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

const userReducer = (state = initialState, action: TUserActions): TUserState => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                userRegisterInProgress: true,
            };
        case USER_REGISTER_REQUEST_SUCCESS:
            if (action.userResult.accessToken.indexOf('Bearer') === 0) {
                setCookie(
                    'accessToken',
                    action.userResult.accessToken.split('Bearer ')[1],
                );
            }
            localStorage.setItem('refreshToken', action.userResult.refreshToken);

            return {
                ...state,
                user: action.userResult.user,
                userRegisterInProgress: false,
                userRegisterSuccess: action.userResult.success,
                userLoginSuccess: true,
                userLogoutSuccess: false,
            };
        case USER_REGISTER_REQUEST_FAILED:
            return {
                ...state,
                userRegisterInProgress: false,
                userRegisterError: action.error,
            };
        case CLEAR_USER_REGISTER_REQUEST_FAILED:
            return {
                ...state,
                userRegisterError: '',
            };
        case USER_LOGIN_REQUEST:
            return {
                ...state,
                userLoginInProgress: true,
            };
        case USER_LOGIN_REQUEST_SUCCESS:
            if (action.userResult.accessToken.indexOf('Bearer') === 0) {
                setCookie(
                    'accessToken',
                    action.userResult.accessToken.split('Bearer ')[1],
                );
            }
            localStorage.setItem('refreshToken', action.userResult.refreshToken);

            return {
                ...state,
                user: action.userResult.user,
                userLoginInProgress: false,
                userLoginSuccess: action.userResult.success,
                userLogoutSuccess: false,
            };
        case USER_LOGIN_REQUEST_FAILED:
            return {
                ...state,
                userLoginInProgress: false,
                userLoginError: action.error,
            };
        case CLEAR_USER_LOGIN_REQUEST_FAILED:
            return {
                ...state,
                userLoginError: '',
            };
        case USER_LOGOUT_REQUEST:
            return {
                ...state,
                userLogoutInProgress: true,
            };
        case USER_LOGOUT_REQUEST_SUCCESS:
            deleteCookie('accessToken');
            localStorage.removeItem('refreshToken');

            return {
                ...state,
                user: {
                    email: '',
                    name: '',
                },
                userLogoutInProgress: false,
                userRegisterSuccess: false,
                userLoginSuccess: false,
                userLogoutSuccess: action.logoutResult.success,
                userForgotPasswordSuccess: false,
                userResetPasswordSuccess: false,
                userLoadSuccess: false,
                userSaveSuccess: false,
            };
        case USER_LOGOUT_REQUEST_FAILED:
            return {
                ...state,
                userLogoutInProgress: false,
                userLogoutError: action.error,
            };
        case CLEAR_USER_LOGOUT_REQUEST_FAILED:
            return {
                ...state,
                userLogoutError: '',
            };
        case USER_FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                userForgotPasswordInProgress: true,
            };
        case USER_FORGOT_PASSWORD_REQUEST_SUCCESS:
            return {
                ...state,
                userForgotPasswordInProgress: false,
                userForgotPasswordSuccess: action.forgotResult.success,
            };
        case USER_FORGOT_PASSWORD_REQUEST_FAILED:
            return {
                ...state,
                userForgotPasswordInProgress: false,
                userForgotPasswordError: action.error,
            };
        case CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED:
            return {
                ...state,
                userForgotPasswordError: '',
            };
        case USER_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                userResetPasswordInProgress: true,
            };
        case USER_RESET_PASSWORD_REQUEST_SUCCESS:
            return {
                ...state,
                userResetPasswordInProgress: false,
                userResetPasswordSuccess: action.resetResult.success,
            };
        case USER_RESET_PASSWORD_REQUEST_FAILED:
            return {
                ...state,
                userResetPasswordInProgress: false,
                userResetPasswordError: action.error,
            };
        case CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED:
            return {
                ...state,
                userResetPasswordError: '',
            };
        case CLEAR_USER_FORGOT_PASSWORD_RESULT:
            return {
                ...state,
                userForgotPasswordSuccess: false,
            };
        case USER_LOAD_DATA_REQUEST:
            return {
                ...state,
                userLoadInProgress: true,
            };
        case USER_LOAD_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                user: action.loadResult.user,
                userLoadInProgress: false,
                userLoadSuccess: action.loadResult.success,
            };
        case USER_LOAD_DATA_REQUEST_FAILED:
            return {
                ...state,
                userLoadInProgress: false,
                userLoadError: action.error,
            };
        case CLEAR_USER_LOAD_DATA_REQUEST_FAILED:
            return {
                ...state,
                userLoadError: '',
            };
        case USER_SAVE_DATA_REQUEST:
            return {
                ...state,
                userSaveInProgress: true,
            };
        case USER_SAVE_DATA_REQUEST_SUCCESS:
            return {
                ...state,
                user: action.saveResult.user,
                userSaveInProgress: false,
                userSaveSuccess: action.saveResult.success,
            };
        case USER_SAVE_DATA_REQUEST_FAILED:
            return {
                ...state,
                userSaveInProgress: false,
                userSaveError: action.error,
            };
        case CLEAR_USER_SAVE_DATA_REQUEST_FAILED:
            return {
                ...state,
                userSaveError: '',
            };
        default:
            return state;
    }
};

export default userReducer;
