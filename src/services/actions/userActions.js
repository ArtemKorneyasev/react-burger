import {
    userRegisterRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
} from "../api";

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const USER_FORGOT_PASSWORD_REQUEST = 'USER_FORGOT_PASSWORD_REQUEST';
export const USER_FORGOT_PASSWORD_ERROR = 'USER_FORGOT_PASSWORD_ERROR';
export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_ERROR = 'USER_RESET_PASSWORD_ERROR';

export const getUserRegister = userData => {
    return dispatch => {
        userRegisterRequest(userData).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_REGISTER_REQUEST, payload: response });
            }
        }).catch(() => {
            dispatch({
                type: USER_REGISTER_ERROR,
                payload: 'Ошибка регистрации, попробуйте позже',
            });
        });
    };
};

export const getUserForgotPassword = email => {
    return dispatch => {
        userForgotPasswordRequest(email).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_FORGOT_PASSWORD_REQUEST, payload: response });
            }
        }).catch(() => {
            dispatch({
                type: USER_FORGOT_PASSWORD_ERROR,
                payload: 'Ошибка восстановления пароля, попробуйте позже',
            });
        });
    };
};

export const getUserResetPassword = ({ password, token }) => {
    return dispatch => {
        userResetPasswordRequest({ password, token }).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_RESET_PASSWORD_REQUEST, payload: response });
            }
        }).catch(() => {
            dispatch({
                type: USER_RESET_PASSWORD_ERROR,
                payload: 'Ошибка восстановления пароля, попробуйте позже',
            });
        });
    };
};
