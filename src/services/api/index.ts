import { getCookie, setCookie } from '../helpers';
import {
    TIngredient,
    TUserFormData,
    IUserResponseDataWithTokens,
    TMakeOrderResult,
    TRequestOptions,
    TUSer,
} from '../types';

const API_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (response: any): Promise<any> => {
    return response.ok
        ? response.json()
        : response.json().then((error: string) => Promise.reject(error));
};

const refreshToken = (): Promise<{
    success: boolean,
    accessToken: string,
    refreshToken: string,
}> => {
    const request = new Request(
        `${API_URL}/auth/token`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            }),
        },
    );

    return fetch(request).then(checkResponse);
};

const fetchWithRefresh = async (url: string, options: TRequestOptions): Promise<any> => {
    try {
        const response = await fetch(url, options);
        return await checkResponse(response);
    } catch (error) {
        if ((error as { success: boolean, message: string}).message === 'jwt expired') {
            const refreshData = await refreshToken();

            if (refreshData.accessToken.indexOf('Bearer') === 0) {
                setCookie(
                    'accessToken',
                    refreshData.accessToken.split('Bearer ')[1],
                );
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            options.headers.Authorization = refreshData.accessToken;

            const response = await fetch(url, options);
            return await checkResponse(response);
        } else {
            return Promise.reject(error);
        }
    }
};

const getIngredientsRequest = async (): Promise<{
    success: boolean,
    data: ReadonlyArray<TIngredient>,
}> => {
    const request = new Request(`${API_URL}/ingredients`);
    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
};

const getOrderRequest = async (
    requestData: {
        ingredients: ReadonlyArray<string>,
    },
): Promise<TMakeOrderResult> => {
    const url = `${API_URL}/orders`;
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify(requestData),
    };

    return await fetchWithRefresh(url, options);
};

const userRegisterRequest = async ({
    name, email, password,
}: TUserFormData): Promise<IUserResponseDataWithTokens> => {
    const request = new Request(
        `${API_URL}/auth/register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        },
    );

    const response = await fetch(request);
    return await checkResponse(response);
};

const userLoginRequest = async ({ email, password }: {
    email: string,
    password: string,
}): Promise<IUserResponseDataWithTokens> => {
    const request = new Request(
        `${API_URL}/auth/login`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        },
    );

    const response = await fetch(request);
    return await checkResponse(response);
};

const userLogoutRequest = async (): Promise<{
    success: boolean,
    message: string,
}> => {
    const request = new Request(
        `${API_URL}/auth/logout`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken'),
            }),
        },
    );

    const response = await fetch(request);
    return await checkResponse(response);
};

const userForgotPasswordRequest = async (email: string): Promise<{
    success: boolean,
    message: string,
}> => {
    const request = new Request(
        `${API_URL}/password-reset`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        },
    );

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
};

const userResetPasswordRequest = async ({ password, token }: {
    password: string,
    token: string,
}): Promise<{ success: boolean, message: string }> => {
    const request = new Request(
        `${API_URL}/password-reset/reset`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password, token }),
        },
    );

    const response = await fetch(request);
    return await checkResponse(response);
};

const userLoadDataRequest = async (): Promise<{
    success: boolean,
    user: TUSer,
}> => {
    const url = `${API_URL}/auth/user`;
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        },
    };

    return await fetchWithRefresh(url, options);
};

const userSaveDataRequest = async (
    { name, email, password }: TUserFormData
): Promise<{ success: boolean, user: TUSer }> => {
    const url = `${API_URL}/auth/user`;
    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie('accessToken'),
        },
        body: JSON.stringify({ name, email, password }),
    };

    return await fetchWithRefresh(url, options);
};

export {
    getIngredientsRequest,
    getOrderRequest,
    userRegisterRequest,
    userLoginRequest,
    userLogoutRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
    userLoadDataRequest,
    userSaveDataRequest,
};
