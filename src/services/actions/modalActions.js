export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const OPEN_USER_REGISTER_MODAL = 'OPEN_USER_REGISTER_MODAL';
export const OPEN_USER_LOGIN_MODAL = 'OPEN_USER_LOGIN_MODAL';
export const OPEN_USER_LOGOUT_MODAL = 'OPEN_USER_LOGOUT_MODAL';
export const OPEN_USER_FORGOT_PASSWORD_MODAL = 'OPEN_USER_FORGOT_PASSWORD_MODAL';
export const OPEN_USER_RESET_PASSWORD_MODAL = 'OPEN_USER_RESET_PASSWORD_MODAL';
export const OPEN_USER_LOAD_MODAL = 'OPEN_USER_LOAD_MODAL';
export const OPEN_USER_SAVE_MODAL = 'OPEN_USER_SAVE_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


export const openIngredientModal = () => {
    return dispatch => dispatch({ type: OPEN_INGREDIENT_MODAL });
}

export const openOrderModal = () => {
    return dispatch => dispatch({ type: OPEN_ORDER_MODAL });
};

export const openUserRegisterModal = () => {
    return dispatch => dispatch({ type: OPEN_USER_REGISTER_MODAL });
};

export const openUserLoginModal = () => {
    return dispatch => dispatch({ type: OPEN_USER_LOGIN_MODAL });
};

export const openUserLogoutModal = () => {
    return dispatch => dispatch({ type: OPEN_USER_LOGOUT_MODAL });
};

export const openUserForgotPasswordModal = () => {
    return dispatch => dispatch({ type: OPEN_USER_FORGOT_PASSWORD_MODAL });
};

export const openUserResetPasswordModal = () => {
    return dispatch => dispatch({ type: OPEN_USER_RESET_PASSWORD_MODAL });
};

export const openUserLoadModal = () => {
    return dispatch => dispatch({ type: OPEN_USER_LOAD_MODAL });
};

export const openUserSaveModal = () => {
    return dispatch => dispatch({ type: OPEN_USER_SAVE_MODAL });
};

export const closeModal = () => {
    return dispatch => dispatch({ type: CLOSE_MODAL });
};
