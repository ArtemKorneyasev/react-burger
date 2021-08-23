import { getCookie, setCookie } from "../helpers";

const API_URL = 'https://norma.nomoreparties.space/api';

export const checkResponse = (response) => {
    return response.ok
        ? response.json()
        : response.json().then(error => Promise.reject(error));
};

const refreshToken = () => {
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

const fetchWithRefresh = async (url, options) => {
    try {
        const response = await fetch(url, options);
        return await checkResponse(response);
    } catch (error) {
        if (error.message === 'jwt expired') {
            const refreshData = refreshToken();

            if (refreshData.accessToken.indexOf('Bearer') === 0) {
                setCookie(
                    'accessToken',
                    refreshData.accessToken.split('Bearer ')[1],
                );
            }
            localStorage.setItem('refreshToken', refreshData.refreshToken);
            options.headers.authorization = refreshData.accessToken;

            const response = await fetch(url, options);
            return await checkResponse(response);
        } else {
            return Promise.reject(error);
        }
    }
};

const getIngredientsRequest = async () => {
    const request = new Request(`${API_URL}/ingredients`);
    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
};

const getOrderRequest = async (orderData) => {
    const request = new Request(
        `${API_URL}/orders`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getCookie('accessToken'),
            },
            body: JSON.stringify(orderData),
        },
    );

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
}

const getOrdersAllRequest = async () => {
    const request = new Request(`${API_URL}/orders/all`);
    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();;
};

const userRegisterRequest = async ({ name, email, password }) => {
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

const userLoginRequest = async ({ email, password }) => {
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

const userLogoutRequest = async () => {
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

const userForgotPasswordRequest = async (email) => {
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

const userResetPasswordRequest = async ({ password, token }) => {
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

const userLoadDataRequest = async () => {
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

const userSaveDataRequest = async ({ name, email, password }) => {
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
    getOrdersAllRequest,
    userRegisterRequest,
    userLoginRequest,
    userLogoutRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
    userLoadDataRequest,
    userSaveDataRequest,
};
