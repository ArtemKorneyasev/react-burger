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

import {
    userRegisterRequest,
    userLoginRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
    userLogoutRequest,
    userLoadDataRequest,
    userSaveDataRequest,
} from '../../api';
import { AppThunk, AppDispatch } from '../thunk-types';
import { TUserFormData, IUserResponseData, IUserResponseDataWithTokens } from '../../types';

export interface IUserRegisterRequestAction {
    readonly type: typeof USER_REGISTER_REQUEST;
}

export interface IUserRegisterRequestSuccessAction {
    readonly type: typeof USER_REGISTER_REQUEST_SUCCESS;
    userResult: IUserResponseDataWithTokens;
}

export interface IUserRegisterFailedAction {
    readonly type: typeof USER_REGISTER_REQUEST_FAILED;
    readonly error: string;
}

export interface IClearUserRegisterRequestFailedAction {
    readonly type: typeof CLEAR_USER_REGISTER_REQUEST_FAILED;
}

export interface IUserLoginRequestAction {
    readonly type: typeof USER_LOGIN_REQUEST;
}

export interface IUserLoginRequestSuccessAction {
    readonly type: typeof USER_LOGIN_REQUEST_SUCCESS;
    userResult: IUserResponseDataWithTokens;
}

export interface IUserLoginRequestFailedAction {
    readonly type: typeof USER_LOGIN_REQUEST_FAILED;
    readonly error: string;
}

export interface IClearUserLoginRequestFailedAction {
    readonly type: typeof CLEAR_USER_LOGIN_REQUEST_FAILED;
}

export interface IUserLogoutRequestAction {
    readonly type: typeof USER_LOGOUT_REQUEST;
}

export interface IUserLogoutRequestSuccessAction {
    readonly type: typeof USER_LOGOUT_REQUEST_SUCCESS;
    readonly logoutResult: { success: boolean, message: string };
}

export interface IUserLogoutRequestFailedAction {
    readonly type: typeof USER_LOGOUT_REQUEST_FAILED;
    readonly error: string;
}

export interface IClearUserLogoutRequestFailedAction {
    readonly type: typeof CLEAR_USER_LOGOUT_REQUEST_FAILED;
}

export interface IUserForgotPasswordRequestAction {
    readonly type: typeof USER_FORGOT_PASSWORD_REQUEST;
}

export interface IUserForgotPasswordRequestSuccessAction {
    readonly type: typeof USER_FORGOT_PASSWORD_REQUEST_SUCCESS;
    readonly forgotResult: { success: boolean, message: string };
}

export interface IUserForgotPasswordRequestFailedAction {
    readonly type: typeof USER_FORGOT_PASSWORD_REQUEST_FAILED;
    readonly error: string;
}

export interface IClearUserForgotPasswordRequestFailedAction {
    readonly type: typeof CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED;
}

export interface IClearUserForgotPasswordResultAction {
    readonly type: typeof CLEAR_USER_FORGOT_PASSWORD_RESULT;
}

export interface IUserResetPasswordRequestAction {
    readonly type: typeof USER_RESET_PASSWORD_REQUEST;
}

export interface IUserResetPasswordRequestSuccessAction {
    readonly type: typeof USER_RESET_PASSWORD_REQUEST_SUCCESS;
    readonly resetResult: { success: boolean, message: string };
}

export interface IUserResetPasswordRequestFailedAction {
    readonly type: typeof USER_RESET_PASSWORD_REQUEST_FAILED;
    readonly error: string;
}

export interface IClearUserResetPasswordRequestFailedAction {
    readonly type: typeof CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED;
}

export interface IUserLoadDataRequestAction {
    readonly type: typeof USER_LOAD_DATA_REQUEST;
}

export interface IUserLoadDataRequestSuccessAction {
    readonly type: typeof USER_LOAD_DATA_REQUEST_SUCCESS;
    readonly loadResult: IUserResponseData;
}

export interface IUserLoadDataRequestFailedAction {
    readonly type: typeof USER_LOAD_DATA_REQUEST_FAILED;
    readonly error: string,
}

export interface IClearUserLoadDataRequestFailedAction {
    readonly type: typeof CLEAR_USER_LOAD_DATA_REQUEST_FAILED;
}

export interface IUserSaveDataRequestAction {
    readonly type: typeof USER_SAVE_DATA_REQUEST;
}

export interface IUserSaveDataRequestSuccessAction {
    readonly type: typeof USER_SAVE_DATA_REQUEST_SUCCESS;
    readonly saveResult: IUserResponseData;
}

export interface IUserSaveDataRequestFailedAction {
    readonly type: typeof USER_SAVE_DATA_REQUEST_FAILED;
    readonly error: string,
}

export interface IClearUserSaveDataRequestFailedAction {
    readonly type: typeof CLEAR_USER_SAVE_DATA_REQUEST_FAILED;
}

export type TUserActions =
 | IUserRegisterRequestAction
 | IUserRegisterRequestSuccessAction
 | IUserRegisterFailedAction
 | IClearUserRegisterRequestFailedAction
 | IUserLoginRequestAction
 | IUserLoginRequestSuccessAction
 | IUserLoginRequestFailedAction
 | IClearUserLoginRequestFailedAction
 | IUserLogoutRequestAction
 | IUserLogoutRequestSuccessAction
 | IUserLogoutRequestFailedAction
 | IClearUserLogoutRequestFailedAction
 | IUserForgotPasswordRequestAction
 | IUserForgotPasswordRequestSuccessAction
 | IUserForgotPasswordRequestFailedAction
 | IClearUserForgotPasswordRequestFailedAction
 | IClearUserForgotPasswordResultAction
 | IUserResetPasswordRequestAction
 | IUserResetPasswordRequestSuccessAction
 | IUserResetPasswordRequestFailedAction
 | IClearUserResetPasswordRequestFailedAction
 | IUserLoadDataRequestAction
 | IUserLoadDataRequestSuccessAction
 | IUserLoadDataRequestFailedAction
 | IClearUserLoadDataRequestFailedAction
 | IUserSaveDataRequestAction
 | IUserSaveDataRequestSuccessAction
 | IUserSaveDataRequestFailedAction
 | IClearUserSaveDataRequestFailedAction;

 export const userRegisterRequestAction = (): IUserRegisterRequestAction => ({
    type: USER_REGISTER_REQUEST,
 });

 export const userRegisterRequestSuccessAction = (
    userResult: IUserResponseDataWithTokens,
 ): IUserRegisterRequestSuccessAction => ({
    type: USER_REGISTER_REQUEST_SUCCESS,
    userResult,
 });

 export const userRegisterRequestFailedAction = (
    error: string,
 ): IUserRegisterFailedAction => ({
    type: USER_REGISTER_REQUEST_FAILED,
    error,
 });

 export const userLoginRequestAction = (): IUserLoginRequestAction => ({
    type: USER_LOGIN_REQUEST,
 });

 export const userLoginRequestSuccessAction = (
    userResult: IUserResponseDataWithTokens,
 ): IUserLoginRequestSuccessAction => ({
    type: USER_LOGIN_REQUEST_SUCCESS,
    userResult,
 });

 export const userLoginRequestFailedAction = (
    error: string,
 ): IUserLoginRequestFailedAction => ({
    type: USER_LOGIN_REQUEST_FAILED,
    error,
 });

 export const userLogoutRequestAction = (): IUserLogoutRequestAction => ({
    type: USER_LOGOUT_REQUEST,
 });

 export const userLogoutRequestSuccessAction = (
    logoutResult: { success: boolean, message: string },
 ): IUserLogoutRequestSuccessAction => ({
    type: USER_LOGOUT_REQUEST_SUCCESS,
    logoutResult,
 });

 export const userLogoutRequestFailedAction = (
    error: string,
 ): IUserLogoutRequestFailedAction => ({
    type: USER_LOGOUT_REQUEST_FAILED,
    error,
 });

 export const userForgotPasswordRequestAction = (): IUserForgotPasswordRequestAction => ({
    type: USER_FORGOT_PASSWORD_REQUEST,
 });

 export const userForgotPasswordRequestSuccessAction = (
    forgotResult: { success: boolean, message: string },
 ): IUserForgotPasswordRequestSuccessAction => ({
    type: USER_FORGOT_PASSWORD_REQUEST_SUCCESS,
    forgotResult,
 });

 export const userForgotPasswordRequestFailedAction = (
    error: string,
 ): IUserForgotPasswordRequestFailedAction => ({
    type: USER_FORGOT_PASSWORD_REQUEST_FAILED,
    error,
 });

 export const userResetPasswordRequestAction = (): IUserResetPasswordRequestAction => ({
    type: USER_RESET_PASSWORD_REQUEST,
 });

 export const userResetPasswordRequestSuccessAction = (
    resetResult: { success: boolean, message: string }
 ): IUserResetPasswordRequestSuccessAction => ({
     type: USER_RESET_PASSWORD_REQUEST_SUCCESS,
     resetResult,
 });

 export const userResetPasswordRequestFailedAction = (
    error: string,
 ): IUserResetPasswordRequestFailedAction => ({
    type: USER_RESET_PASSWORD_REQUEST_FAILED,
    error,
 });

 export const userLoadDataRequestAction = (): IUserLoadDataRequestAction => ({
    type: USER_LOAD_DATA_REQUEST,
 });

 export const userLoadDataRequestSuccessAction = (
    loadResult: IUserResponseData,
 ): IUserLoadDataRequestSuccessAction => ({
    type: USER_LOAD_DATA_REQUEST_SUCCESS,
    loadResult,
 });

 export const userLoadDataRequestFailedAction = (
    error: string,
 ): IUserLoadDataRequestFailedAction => ({
    type: USER_LOAD_DATA_REQUEST_FAILED,
    error,
 });

 export const userSaveDataRequestAction = (): IUserSaveDataRequestAction => ({
    type: USER_SAVE_DATA_REQUEST,
 });

 export const userSaveDataRequestSuccessAction = (
    saveResult: IUserResponseData,
 ): IUserSaveDataRequestSuccessAction => ({
    type: USER_SAVE_DATA_REQUEST_SUCCESS,
    saveResult,
 });

 export const userSaveDataRequestFailedAction = (
    error: string,
 ): IUserSaveDataRequestFailedAction => ({
    type: USER_SAVE_DATA_REQUEST_FAILED,
    error,
 });

 export const getUserRegister: AppThunk = (
    formData: TUserFormData,
 ) => (dispatch: AppDispatch) => {
    dispatch(userRegisterRequestAction());
    userRegisterRequest(formData).then(response => {
        if (response && response.success) {
            dispatch(userRegisterRequestSuccessAction(response));
        }
    }).catch((error) => {
        dispatch(userRegisterRequestFailedAction(error.message));
    });
 };

export const clearUserRegisterError = (): IClearUserRegisterRequestFailedAction => {
    return { type: CLEAR_USER_REGISTER_REQUEST_FAILED };
};

export const getUserLogin: AppThunk = (
    formData: { readonly email: string, readonly password: string },
) => (dispatch: AppDispatch) => {
    dispatch(userLoginRequestAction());
    userLoginRequest(formData).then(response => {
        if (response && response.success) {
            dispatch(userLoginRequestSuccessAction(response));
        }
    }).catch((error) => {
        dispatch(userLoginRequestFailedAction(error.message));
    });
};

export const clearUserLoginError = (): IClearUserLoginRequestFailedAction => {
    return { type: CLEAR_USER_LOGIN_REQUEST_FAILED };
};

export const getUserLogout: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userLogoutRequestAction());
    userLogoutRequest().then(response => {
        if (response && response.success) {
            dispatch(userLogoutRequestSuccessAction(response));
        }
    }).catch((error) => {
        dispatch(userLogoutRequestFailedAction(error.message));
    });
};

export const clearUserLogoutError = (): IClearUserLogoutRequestFailedAction => {
    return { type: CLEAR_USER_LOGOUT_REQUEST_FAILED };
};

export const getUserForgotPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
    dispatch(userForgotPasswordRequestAction());
    userForgotPasswordRequest(email).then(response => {
        if (response && response.success) {
            dispatch(userForgotPasswordRequestSuccessAction(response));
        }
    }).catch((error) => {
        dispatch(userForgotPasswordRequestFailedAction(error.message));
    });
};

export const clearUserForgotPasswordError = (): IClearUserForgotPasswordRequestFailedAction => {
    return { type: CLEAR_USER_FORGOT_PASSWORD_REQUEST_FAILED };
};

export const clearUserForgotPasswordResult = (): IClearUserForgotPasswordResultAction => {
    return { type: CLEAR_USER_FORGOT_PASSWORD_RESULT };
};

export const getUserResetPassword: AppThunk = (
    resetData: { password: string, token: string },
) => (dispatch: AppDispatch) => {
    dispatch(userResetPasswordRequestAction());
    userResetPasswordRequest(resetData).then(response => {
        if (response && response.success) {
            dispatch(userResetPasswordRequestSuccessAction(response));
            dispatch(clearUserForgotPasswordResult());
        }
    }).catch(() => {
        dispatch(userResetPasswordRequestFailedAction(
            'Ошибка восстановления пароля, попробуйте восстановить пароль еще раз',
        ));
    });
};

export const clearUserResetPasswordError = (): IClearUserResetPasswordRequestFailedAction => {
    return { type: CLEAR_USER_RESET_PASSWORD_REQUEST_FAILED };
};

export const getUserLoadData: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(userLoadDataRequestAction());
    userLoadDataRequest().then(response => {
        if (response && response.success) {
            dispatch(userLoadDataRequestSuccessAction(response));
        }
    }).catch((error) => {
        dispatch(userLoadDataRequestFailedAction(error.message));
    });
};

export const clearUserLoadError = (): IClearUserLoadDataRequestFailedAction => {
    return { type: CLEAR_USER_LOAD_DATA_REQUEST_FAILED };
};

export const getUserSaveData: AppThunk = (
    userData: TUserFormData,
) => (dispatch: AppDispatch) => {
    dispatch(userSaveDataRequestAction());
    userSaveDataRequest(userData).then(response => {
        if (response && response.success) {
            dispatch(userSaveDataRequestSuccessAction(response));
        }
    }).catch((error) => {
        dispatch(userSaveDataRequestFailedAction(error.message));
    });
};

export const clearUserSaveError = (): IClearUserSaveDataRequestFailedAction => {
    return { type: CLEAR_USER_SAVE_DATA_REQUEST_FAILED };
};
