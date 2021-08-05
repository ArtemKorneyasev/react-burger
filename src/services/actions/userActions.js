import {
    userRegisterRequest,
    userLoginRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
    userLogoutRequest,
} from "../api";

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const CLEAR_REGISTER_ERROR = 'CLEAR_REGISTER_ERROR';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const CLEAR_LOGIN_ERROR = 'CLEAR_LOGIN_ERROR';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';
export const CLEAR_LOGOUT_ERROR = 'CLEAR_LOGOUT_ERROR';

export const USER_FORGOT_PASSWORD_REQUEST = 'USER_FORGOT_PASSWORD_REQUEST';
export const USER_FORGOT_PASSWORD_ERROR = 'USER_FORGOT_PASSWORD_ERROR';
export const CLEAR_FORGOT_PASSWORD_ERROR = 'CLEAR_FORGOT_PASSWORD_ERROR';

export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_ERROR = 'USER_RESET_PASSWORD_ERROR';
export const CLEAR_RESET_PASSWORD_ERROR = 'CLEAR_RESET_PASSWORD_ERROR';

export const getUserRegister = userData => {
    return dispatch => {
        userRegisterRequest(userData).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_REGISTER_REQUEST, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_REGISTER_ERROR, payload: error.message });
        });
    };
};

export const clearRegisterError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_REGISTER_ERROR });
    };
};

export const getUserLogin = userData => {
    return dispatch => {
        userLoginRequest(userData).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_LOGIN_REQUEST, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_LOGIN_ERROR, payload: error.message });
        });
    };
};

export const clearLoginError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_LOGIN_ERROR });
    };
};

export const getUserLogout = refreshToken => {
    return dispatch => {
        userLogoutRequest(refreshToken).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_LOGOUT_REQUEST, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_LOGOUT_ERROR, payload: error.message });
        });
    };
};

export const clearLogoutError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_LOGOUT_ERROR });
    };
};

export const getUserForgotPassword = email => {
    return dispatch => {
        userForgotPasswordRequest(email).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_FORGOT_PASSWORD_REQUEST, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_FORGOT_PASSWORD_ERROR, payload: error.message });
        });
    };
};

export const clearForgotPasswordError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_FORGOT_PASSWORD_ERROR });
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
                payload: 'Ошибка восстановления пароля, попробуйте восстановить пароль еще раз',
            });
        });
    };
};

export const clearResetPasswordError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_RESET_PASSWORD_ERROR });
    };
};
