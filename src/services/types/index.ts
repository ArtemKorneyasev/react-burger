export type TIngredient = {
    readonly _id: string,
    readonly name: string,
    readonly type: 'bun' | 'sauce' | 'main',
    readonly proteins: number,
    readonly fat: number,
    readonly carbohydrates: number,
    readonly calories: number,
    readonly price: number,
    readonly image: string,
    readonly image_mobile: string,
    readonly image_large: string,
    readonly __v: number,
};

export type TIngredientData = {
    readonly uniqueId: string,
    data: TIngredient,
};

export type TBurgerData = {
    bun: TIngredientData | null,
    toppings: ReadonlyArray<TIngredientData>,
};

export type TOrderResult = {
    ingredients: ReadonlyArray<TIngredient>,
    readonly _id: string,
    readonly owner: {
        name: string,
        email: string,
        createdAt: string,
        updatedAt: string,
    },
    readonly name: string,
    readonly number: number,
    readonly price: number,
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly status: 'created' | 'pending' | 'done',
};

export type TOrder = {
    ingredients: ReadonlyArray<string>,
    readonly _id: string,
    readonly status: 'created' | 'pending' | 'done',
    readonly createdAt: string,
    readonly updatedAt: string,
    readonly number: number,
    readonly name: string,
};

export type TMakeOrderResult = {
    readonly success: boolean,
    readonly name: string,
    order: TOrderResult,
};

export type TGetOrdersResult = {
    readonly success: boolean,
    orders: ReadonlyArray<TOrder>,
    readonly total: number,
    readonly totalToday: number,
};

export type TUserFormData = {
    readonly email: string,
    readonly password: string,
    readonly name: string,
};

export type TUSer = {
    email: string,
    name: string,
};

export interface IUserResponseData {
    readonly success: boolean;
    readonly user: TUSer;
}

export interface IUserResponseDataWithTokens extends IUserResponseData {
    accessToken: string;
    readonly refreshToken: string;
}
