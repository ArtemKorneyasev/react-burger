import {
    userRegisterRequest,
    userLoginRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
    userLogoutRequest,
    userLoadDataRequest,
    userSaveDataRequest,
} from "../api";

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_ERROR = 'USER_REGISTER_ERROR';
export const CLEAR_USER_REGISTER_ERROR = 'CLEAR_USER_REGISTER_ERROR';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
export const CLEAR_USER_LOGIN_ERROR = 'CLEAR_USER_LOGIN_ERROR';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_ERROR = 'USER_LOGOUT_ERROR';
export const CLEAR_USER_LOGOUT_ERROR = 'CLEAR_USER_LOGOUT_ERROR';

export const USER_FORGOT_PASSWORD_REQUEST = 'USER_FORGOT_PASSWORD_REQUEST';
export const USER_FORGOT_PASSWORD_ERROR = 'USER_FORGOT_PASSWORD_ERROR';
export const CLEAR_USER_FORGOT_PASSWORD_ERROR = 'CLEAR_USER_FORGOT_PASSWORD_ERROR';
export const CLEAR_FORGOT_PASSWORD_RESULT = 'CLEAR_FORGOT_PASSWORD_RESULT';

export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_ERROR = 'USER_RESET_PASSWORD_ERROR';
export const CLEAR_USER_RESET_PASSWORD_ERROR = 'CLEAR_USER_RESET_PASSWORD_ERROR';

export const USER_LOAD_DATA_REQUEST = 'USER_LOAD_DATA_REQUEST';
export const USER_LOAD_DATA_ERROR = 'USER_LOAD_DATA_ERROR';
export const CLEAR_USER_LOAD_DATA_ERROR = 'CLEAR_USER_LOAD_DATA_ERROR';

export const USER_SAVE_DATA_REQUEST = 'USER_SAVE_DATA_REQUEST';
export const USER_SAVE_DATA_ERROR = 'USER_SAVE_DATA_ERROR';
export const CLEAR_USER_SAVE_DATA_ERROR = 'CLEAR_USER_SAVE_DATA_ERROR';

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

export const clearUserRegisterError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_REGISTER_ERROR });
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

export const clearUserLoginError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_LOGIN_ERROR });
    };
};

export const getUserLogout = () => {
    return dispatch => {
        userLogoutRequest().then(response => {
            if (response && response.success) {
                dispatch({ type: USER_LOGOUT_REQUEST, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_LOGOUT_ERROR, payload: error.message });
        });
    };
};

export const clearUserLogoutError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_LOGOUT_ERROR });
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

export const clearUserForgotPasswordError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_FORGOT_PASSWORD_ERROR });
    };
};

export const getUserResetPassword = ({ password, token }) => {
    return dispatch => {
        userResetPasswordRequest({ password, token }).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_RESET_PASSWORD_REQUEST, payload: response });
                dispatch({ type: CLEAR_FORGOT_PASSWORD_RESULT });
            }
        }).catch(() => {
            dispatch({
                type: USER_RESET_PASSWORD_ERROR,
                payload: 'Ошибка восстановления пароля, попробуйте восстановить пароль еще раз',
            });
        });
    };
};

export const clearUserResetPasswordError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_RESET_PASSWORD_ERROR });
    };
};

export const getUserLoadData = () => {
    return async dispatch => {
        await userLoadDataRequest().then(response => {
            if (response && response.success) {
                dispatch({ type: USER_LOAD_DATA_REQUEST, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_LOAD_DATA_ERROR, payload: error.message });
        });
    };
};

export const clearUserLoadError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_LOAD_DATA_ERROR });
    };
};

export const getUserSaveData = (userData) => {
    return async dispatch => {
        await userSaveDataRequest(userData).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_SAVE_DATA_REQUEST, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_SAVE_DATA_ERROR, payload: error.message });
        });
    };
};

export const clearUserSaveError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_SAVE_DATA_ERROR });
    };
};
