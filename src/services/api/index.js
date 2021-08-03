const API_URL = 'https://norma.nomoreparties.space/api';

const getIngredientsRequest = async () => {
    const request = new Request(`${API_URL}/ingredients`);
    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
};

const getOrderDetailsRequest = async (orderData) => {
    const request = new Request(
        `${API_URL}/orders`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData),
        },
    );

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
}

const userRegisterRequest = async (userData) => {
    const request = new Request(
        `${API_URL}/register`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData),
        }
    );

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
};

const userForgotPasswordRequest = async (email) => {
    const request = new Request(
        `${API_URL}/password-reset`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        }
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
        }
    );

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
};

export {
    getIngredientsRequest,
    getOrderDetailsRequest,
    userRegisterRequest,
    userForgotPasswordRequest,
    userResetPasswordRequest,
};