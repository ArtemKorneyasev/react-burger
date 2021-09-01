export const ingredientsMock = [
    {
        data: {
            _id: '60d3b41abdacab0026a733cd',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0,
        },
    },
    {
        data: {
            _id: '60d3b41abdacab0026a733cb',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0,
        },
    },
];

export const bunMock = {
    uniqueId: 'onabevCQTnjvjgAF8Y3Zf',
    data: {
        _id: '60d3b41abdacab0026a733c7',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
    },
};

export const toppingsMock = [
    {
        uniqueId: '66HJF68ahgOlbHzgF0wnJ',
        data: {
            _id: '60d3b41abdacab0026a733cd',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0,
        },
    },
    {
        uniqueId: 'IOjZ92Lnn2slw3pnC_hg4',
        data: {
            _id: '60d3b41abdacab0026a733cb',
            name: 'Биокотлета из марсианской Магнолии',
            type: 'main',
            proteins: 420,
            fat: 142,
            carbohydrates: 242,
            calories: 4242,
            price: 424,
            image: 'https://code.s3.yandex.net/react/code/meat-01.png',
            image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
            image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
            __v: 0,
        },
    },
];

export const ingredientsListMock = {
    ingredients: [
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733c6',
        '60d3b41abdacab0026a733cb',
        '60d3b41abdacab0026a733cd',
    ],
};

export const orderResultMock = {
    success: true,
    name: 'Краторный био-марсианский space бургер',
    order: {
        ingredients: [
            {
                _id: '60d3b41abdacab0026a733c6',
                name: 'Краторная булка N-200i',
                type: 'bun',
                proteins: 80,
                fat: 24,
                carbohydrates: 53,
                calories: 420,
                price: 1255,
                image: 'https://code.s3.yandex.net/react/code/bun-02.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
                __v: 0,
            },
            {
                _id: '60d3b41abdacab0026a733cb',
                name: 'Биокотлета из марсианской Магнолии',
                type: 'main',
                proteins: 420,
                fat: 142,
                carbohydrates: 242,
                calories: 4242,
                price: 424,
                image: 'https://code.s3.yandex.net/react/code/meat-01.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
                __v: 0,
            },
            {
                _id: '60d3b41abdacab0026a733cd',
                name: 'Соус фирменный Space Sauce',
                type: 'sauce',
                proteins: 50,
                fat: 22,
                carbohydrates: 11,
                calories: 14,
                price: 80,
                image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
                image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
                image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
                __v: 0,
            },
        ],
        _id: '612b5c3215024d001b9d1018',
        owner: {
            name: 'Artem Korneyasev',
            email: 'artemkorneyasev@gmail.com',
            createdAt: '2021-08-01T16:50:42.390Z',
            updatedAt: '2021-08-22T09:05:38.994Z',
        },
        status: 'done',
        name: 'Краторный био-марсианский space бургер',
        createdAt: '2021-08-29T10:06:42.918Z',
        updatedAt: '2021-08-29T10:06:43.034Z',
        number: 2355,
        price: 1759,
    },
};

export const userRegisterResultMock = {
    success: true,
    user: {
        email: 'artemkorneyasev@gmail.com',
        name: 'Artem Korneyasev',
    },
    // eslint-disable-next-line
    accessToken: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMDZkMGUyOWQ5NTJmMDAxYjgyMjBkMSIsImlhdCI6MTYzMDI0MTA2NiwiZXhwIjoxNjMwMjQyMjY2fQ.wJe9Qa1fx_oi15zYQ6z3da5sE047uNzhA4-6VsRZyPQ',
    // eslint-disable-next-line
    refreshToken: '761cf72da04cb06e4903612a150c8ecfe1a2ccf387e5327ae392682c23ba5904fc73da7aaf039635',
};

export const wsOrdersResultMock = {
    orders: [
        {
            _id: '612bb4a315024d001b9d1110',
            ingredients: [
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733cd',
            ],
            status: 'done',
            name: 'Space флюоресцентный бургер',
            createdAt: '2021-08-29T16:24:03.534Z',
            updatedAt: '2021-08-29T16:24:03.600Z',
            number: 2373,
        },
        {
            _id: '612bb45315024d001b9d110f',
            ingredients: [
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733c7',
                '60d3b41abdacab0026a733cf',
                '60d3b41abdacab0026a733cd',
                '60d3b41abdacab0026a733c9',
            ],
            status: 'done',
            name: 'Бессмертный space флюоресцентный антарианский бургер',
            createdAt: '2021-08-29T16:22:43.291Z',
            updatedAt: '2021-08-29T16:22:43.378Z',
            number: 2372,
        },
    ],
    total: 2372,
    totalToday: 26,
};
