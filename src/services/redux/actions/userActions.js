import {
    userRegisterRequest,
    userLoginRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
    userLogoutRequest,
    userLoadDataRequest,
    userSaveDataRequest,
} from '../../api';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_REQUEST_SUCCESS = 'USER_REGISTER_REQUEST_SUCCESS';
export const USER_REGISTER_REQUEST_FAILED = 'USER_REGISTER_REQUEST_FAILED';
export const CLEAR_USER_REGISTER_REQUEST_FAILED = 'CLEAR_USER_REGISTER_REQUEST_FAILED';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_REQUEST_SUCCESS = 'USER_LOGIN_REQUEST_SUCCESS';
export const USER_LOGIN_REQUEST_FAILED = 'USER_LOGIN_REQUEST_FAILED';
export const CLEAR_USER_LOGIN_REQUEST_FAILED = 'CLEAR_USER_LOGIN_REQUEST_FAILED';

export const USER_LOGOUT_REQUEST = 'USER_LOGOUT_REQUEST';
export const USER_LOGOUT_REQUEST_SUCCESS = 'USER_LOGOUT_REQUEST_SUCCESS';
export const USER_LOGOUT_REQUEST_FAILED = 'USER_LOGOUT_REQUEST_FAILED';
export const CLEAR_USER_LOGOUT_REQUEST_FAILED = 'CLEAR_USER_LOGOUT_REQUEST_FAILED';

export const USER_FORGOT_PASSWORD_REQUEST = 'USER_FORGOT_PASSWORD_REQUEST';
export const USER_FORGOT_PASSWORD_REQUEST_SUCCESS = 'USER_FORGOT_PASSWORD_REQUEST_SUCCESS';
export const USER_FORGOT_PASSWORD_REQUEST_FAILED = 'USER_FORGOT_PASSWORD_REQUEST_FAILED';
export const CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED =
    'CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED';
export const CLEAR_FORGOT_PASSWORD_RESULT = 'CLEAR_FORGOT_PASSWORD_RESULT';

export const USER_RESET_PASSWORD_REQUEST = 'USER_RESET_PASSWORD_REQUEST';
export const USER_RESET_PASSWORD_REQUEST_SUCCESS = 'USER_RESET_PASSWORD_REQUEST_SUCCESS';
export const USER_RESET_PASSWORD_REQUEST_FAILED = 'USER_RESET_PASSWORD_REQUEST_FAILED';
export const CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED = 'CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED';

export const USER_LOAD_DATA_REQUEST = 'USER_LOAD_DATA_REQUEST';
export const USER_LOAD_DATA_REQUEST_SUCCESS = 'USER_LOAD_DATA_REQUEST_SUCCESS';
export const USER_LOAD_DATA_REQUEST_FAILED = 'USER_LOAD_DATA_REQUEST_FAILED';
export const CLEAR_USER_LOAD_DATA_REQUEST_FAILED = 'CLEAR_USER_LOAD_DATA_REQUEST_FAILED';

export const USER_SAVE_DATA_REQUEST = 'USER_SAVE_DATA_REQUEST';
export const USER_SAVE_DATA_REQUEST_SUCCESS = 'USER_SAVE_DATA_REQUEST_SUCCESS';
export const USER_SAVE_DATA_REQUEST_FAILED = 'USER_SAVE_DATA_REQUEST_FAILED';
export const CLEAR_USER_SAVE_DATA_REQUEST_FAILED = 'CLEAR_USER_SAVE_DATA_REQUEST_FAILED';

export const getUserRegister = userData => {
    return dispatch => {
        dispatch({ type: USER_REGISTER_REQUEST });
        userRegisterRequest(userData).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_REGISTER_REQUEST_SUCCESS, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_REGISTER_REQUEST_FAILED, payload: error.message });
        });
    };
};

export const clearUserRegisterError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_REGISTER_REQUEST_FAILED });
    };
};

export const getUserLogin = userData => {
    return dispatch => {
        dispatch({ type: USER_LOGIN_REQUEST });
        userLoginRequest(userData).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_LOGIN_REQUEST_SUCCESS, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_LOGIN_REQUEST_FAILED, payload: error.message });
        });
    };
};

export const clearUserLoginError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_LOGIN_REQUEST_FAILED });
    };
};

export const getUserLogout = () => {
    return dispatch => {
        dispatch({ type: USER_LOGOUT_REQUEST });
        userLogoutRequest().then(response => {
            if (response && response.success) {
                dispatch({ type: USER_LOGOUT_REQUEST_SUCCESS, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_LOGOUT_REQUEST_FAILED, payload: error.message });
        });
    };
};

export const clearUserLogoutError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_LOGOUT_REQUEST_FAILED });
    };
};

export const getUserForgotPassword = email => {
    return dispatch => {
        dispatch({ type: USER_FORGOT_PASSWORD_REQUEST });
        userForgotPasswordRequest(email).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_FORGOT_PASSWORD_REQUEST_SUCCESS, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_FORGOT_PASSWORD_REQUEST_FAILED, payload: error.message });
        });
    };
};

export const clearUserForgotPasswordError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED });
    };
};

export const getUserResetPassword = ({ password, token }) => {
    return dispatch => {
        dispatch({ type: USER_RESET_PASSWORD_REQUEST });
        userResetPasswordRequest({ password, token }).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_RESET_PASSWORD_REQUEST_SUCCESS, payload: response });
                dispatch({ type: CLEAR_FORGOT_PASSWORD_RESULT });
            }
        }).catch(() => {
            dispatch({
                type: USER_RESET_PASSWORD_REQUEST_FAILED,
                payload: 'Ошибка восстановления пароля, попробуйте восстановить пароль еще раз',
            });
        });
    };
};

export const clearUserResetPasswordError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED });
    };
};

export const getUserLoadData = () => {
    return async dispatch => {
        dispatch({ type: USER_LOAD_DATA_REQUEST });
        await userLoadDataRequest().then(response => {
            if (response && response.success) {
                dispatch({ type: USER_LOAD_DATA_REQUEST_SUCCESS, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_LOAD_DATA_REQUEST_FAILED, payload: error.message });
        });
    };
};

export const clearUserLoadError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_LOAD_DATA_REQUEST_FAILED });
    };
};

export const getUserSaveData = (userData) => {
    return async dispatch => {
        dispatch({ type: USER_SAVE_DATA_REQUEST });
        await userSaveDataRequest(userData).then(response => {
            if (response && response.success) {
                dispatch({ type: USER_SAVE_DATA_REQUEST_SUCCESS, payload: response });
            }
        }).catch((error) => {
            dispatch({ type: USER_SAVE_DATA_REQUEST_FAILED, payload: error.message });
        });
    };
};

export const clearUserSaveError = () => {
    return dispatch => {
        dispatch({ type: CLEAR_USER_SAVE_DATA_REQUEST_FAILED });
    };
};
