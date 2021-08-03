import {
    USER_REGISTER_REQUEST,
    USER_REGISTER_ERROR,
    USER_FORGOT_PASSWORD_REQUEST,
    USER_FORGOT_PASSWORD_ERROR,
    USER_RESET_PASSWORD_REQUEST,
    USER_RESET_PASSWORD_ERROR,
} from '../actions/userActions';
import { setCookie } from '../helpers';

const initialState = {
    user: {
        email: '',
        name: '',
    },
    registerError: '',
    forgotPasswordResult: {},
    forgotPasswordError: '',
    resetPasswordResult: {},
    resetPasswordError: '',
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            setCookie('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);

            return {
                ...state,
                user: action.payload,
            };
        case USER_REGISTER_ERROR:
            return {
                ...state,
                registerError: action.payload,
            };
        case USER_FORGOT_PASSWORD_REQUEST:
            return {
                ...state,
                forgotPasswordResult: action.payload,
            };
        case USER_FORGOT_PASSWORD_ERROR:
            return {
                ...state,
                forgotPasswordError: action.payload,
            };
        case USER_RESET_PASSWORD_REQUEST:
            return {
                ...state,
                resetPasswordResult: action.payload,
            };
        case USER_RESET_PASSWORD_ERROR:
            return {
                ...state,
                resetPasswordError: action.payload,
            };
        default:
            return state;
    }
};

export default userReducer;
