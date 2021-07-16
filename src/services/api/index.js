export const getIngredientsRequest = async () => {
    const request = new Request(
        'https://norma.nomoreparties.space/api/ingredients',
    );
    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
};

export const getOrderDetailsRequest = async (requestData) => {
    const request = new Request(
        'https://norma.nomoreparties.space/api/orders',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData),
        },
    );

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(`Response error, status: ${response.status}`);
    }

    return await response.json();
}
