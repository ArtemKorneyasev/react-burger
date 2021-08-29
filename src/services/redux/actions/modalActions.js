export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_RESULT_MODAL = 'OPEN_ORDER_RESULT_MODAL';
export const OPEN_ORDER_DETAILS_MODAL = 'OPEN_ORDER_DETAILS_MODAL';
export const OPEN_USER_REGISTER_MODAL = 'OPEN_USER_REGISTER_MODAL';
export const OPEN_USER_LOGIN_MODAL = 'OPEN_USER_LOGIN_MODAL';
export const OPEN_USER_LOGOUT_MODAL = 'OPEN_USER_LOGOUT_MODAL';
export const OPEN_USER_FORGOT_PASSWORD_MODAL = 'OPEN_USER_FORGOT_PASSWORD_MODAL';
export const OPEN_USER_RESET_PASSWORD_MODAL = 'OPEN_USER_RESET_PASSWORD_MODAL';
export const OPEN_USER_LOAD_MODAL = 'OPEN_USER_LOAD_MODAL';
export const OPEN_USER_SAVE_MODAL = 'OPEN_USER_SAVE_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


export const openIngredientModal = () => {
    return { type: OPEN_INGREDIENT_MODAL };
};

export const openOrderResultModal = () => {
    return { type: OPEN_ORDER_RESULT_MODAL };
};

export const openOrderDetailsModal = () => {
    return { type: OPEN_ORDER_DETAILS_MODAL };
};

export const openUserRegisterModal = () => {
    return { type: OPEN_USER_REGISTER_MODAL };
};

export const openUserLoginModal = () => {
    return { type: OPEN_USER_LOGIN_MODAL };
};

export const openUserLogoutModal = () => {
    return { type: OPEN_USER_LOGOUT_MODAL };
};

export const openUserForgotPasswordModal = () => {
    return { type: OPEN_USER_FORGOT_PASSWORD_MODAL };
};

export const openUserResetPasswordModal = () => {
    return { type: OPEN_USER_RESET_PASSWORD_MODAL };
};

export const openUserLoadModal = () => {
    return { type: OPEN_USER_LOAD_MODAL };
};

export const openUserSaveModal = () => {
    return { type: OPEN_USER_SAVE_MODAL };
};

export const closeModal = () => {
    return { type: CLOSE_MODAL };
};
