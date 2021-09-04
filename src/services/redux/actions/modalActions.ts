import {
    OPEN_INGREDIENT_MODAL,
    OPEN_ORDER_RESULT_MODAL,
    OPEN_ORDER_DETAILS_MODAL,
    OPEN_USER_REGISTER_MODAL,
    OPEN_USER_LOGIN_MODAL,
    OPEN_USER_LOGOUT_MODAL,
    OPEN_USER_FORGOT_PASSWORD_MODAL,
    OPEN_USER_RESET_PASSWORD_MODAL,
    OPEN_USER_LOAD_MODAL,
    OPEN_USER_SAVE_MODAL,
    CLOSE_MODAL,
} from '../constants/modal';

export interface IOpenIngredientModalAction {
    readonly type: typeof OPEN_INGREDIENT_MODAL;
}

export interface IOpenOrderResultModalAction {
    readonly type: typeof OPEN_ORDER_RESULT_MODAL;
}

export interface IOpenOrderDetailsModalAction {
    readonly type: typeof OPEN_ORDER_DETAILS_MODAL;
}

export interface IOpenUserRegisterModalAction {
    readonly type: typeof OPEN_USER_REGISTER_MODAL;
}

export interface IOpenUserLoginModalAction {
    readonly type: typeof OPEN_USER_LOGIN_MODAL;
}

export interface IOpenUserLogoutModalAction {
    readonly type: typeof OPEN_USER_LOGOUT_MODAL;
}

export interface IOpenUserForgotPasswordModalAction {
    readonly type: typeof OPEN_USER_FORGOT_PASSWORD_MODAL;
}

export interface IOpenUserResetPasswordModalAction {
    readonly type: typeof OPEN_USER_RESET_PASSWORD_MODAL;
}

export interface IOpenUserLoadModalAction {
    readonly type: typeof OPEN_USER_LOAD_MODAL;
}

export interface IOpenUserSaveModalAction {
    readonly type: typeof OPEN_USER_SAVE_MODAL;
}

export interface ICloseModalActionAction {
    readonly type: typeof CLOSE_MODAL;
}

export type TModalActions =
    | IOpenIngredientModalAction
    | IOpenOrderResultModalAction
    | IOpenOrderDetailsModalAction
    | IOpenUserRegisterModalAction
    | IOpenUserLoginModalAction
    | IOpenUserLogoutModalAction
    | IOpenUserForgotPasswordModalAction
    | IOpenUserResetPasswordModalAction
    | IOpenUserLoadModalAction
    | IOpenUserSaveModalAction
    | ICloseModalActionAction;

export const openIngredientModal = (): IOpenIngredientModalAction => {
    return { type: OPEN_INGREDIENT_MODAL };
};

export const openOrderResultModal = (): IOpenOrderResultModalAction => {
    return { type: OPEN_ORDER_RESULT_MODAL };
};

export const openOrderDetailsModal = (): IOpenOrderDetailsModalAction => {
    return { type: OPEN_ORDER_DETAILS_MODAL };
};

export const openUserRegisterModal = (): IOpenUserRegisterModalAction => {
    return { type: OPEN_USER_REGISTER_MODAL };
};

export const openUserLoginModal = (): IOpenUserLoginModalAction => {
    return { type: OPEN_USER_LOGIN_MODAL };
};

export const openUserLogoutModal = (): IOpenUserLogoutModalAction => {
    return { type: OPEN_USER_LOGOUT_MODAL };
};

export const openUserForgotPasswordModal = (): IOpenUserForgotPasswordModalAction => {
    return { type: OPEN_USER_FORGOT_PASSWORD_MODAL };
};

export const openUserResetPasswordModal = (): IOpenUserResetPasswordModalAction => {
    return { type: OPEN_USER_RESET_PASSWORD_MODAL };
};

export const openUserLoadModal = (): IOpenUserLoadModalAction => {
    return { type: OPEN_USER_LOAD_MODAL };
};

export const openUserSaveModal = (): IOpenUserSaveModalAction => {
    return { type: OPEN_USER_SAVE_MODAL };
};

export const closeModal = (): ICloseModalActionAction => {
    return { type: CLOSE_MODAL };
};
