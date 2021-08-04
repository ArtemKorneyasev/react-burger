export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const OPEN_FORGOT_PASSWORD_MODAL = 'OPEN_FORGOT_PASSWORD_MODAL';
export const OPEN_RESET_PASSWORD_MODAL = 'OPEN_RESET_PASSWORD_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';


export const openIngredientModal = () => {
    return dispatch => dispatch({ type: OPEN_INGREDIENT_MODAL });
}

export const openOrderModal = () => {
    return dispatch => dispatch({ type: OPEN_ORDER_MODAL });
};

export const openForgotPasswordModal = () => {
    return dispatch => dispatch({ type: OPEN_FORGOT_PASSWORD_MODAL });
};

export const openResetPasswordModal = () => {
    return dispatch => dispatch({ type: OPEN_RESET_PASSWORD_MODAL });
};

export const closeModal = () => {
    return dispatch => dispatch({ type: CLOSE_MODAL });
};
