import {
    ADD_BUN,
    ADD_TOPPING,
    DELETE_TOPPING,
    SORT_TOPPINGS,
    CLEAR_BURGER_CONSTRUCTOR,
    CALC_TOTAL_PRICE,
} from '../constants/constructor';
import { TIngredientData, TBurgerData } from '../../types';

export interface IAddIngredient {
    readonly type: typeof ADD_BUN | typeof ADD_TOPPING;
    readonly ingredientData: TIngredientData;
}

export interface IDeleteToppingAction {
    readonly type: typeof DELETE_TOPPING;
    readonly index: number;
}

export interface ISortToppingsAction {
    readonly type: typeof SORT_TOPPINGS;
    readonly sortResult: { dragIndex: number, hoverIndex: number };
}

export interface IClearBurgerConstructorAction {
    readonly type: typeof CLEAR_BURGER_CONSTRUCTOR;
}

export interface ICalcTotalPrice {
    readonly type: typeof CALC_TOTAL_PRICE;
    readonly totalPrice: number;
}

export type TConstructorActions =
    | IAddIngredient
    | IDeleteToppingAction
    | ISortToppingsAction
    | IClearBurgerConstructorAction
    | ICalcTotalPrice;

export const addIngredient = (ingredientData: TIngredientData): IAddIngredient | void => {
    const { data } = ingredientData;

    if (data !== undefined && data.type) {
        switch (data.type) {
            case 'bun':
                return {
                    type: ADD_BUN,
                    ingredientData,
                };
            case 'sauce':
            case 'main':
                return {
                    type: ADD_TOPPING,
                    ingredientData,
                };
            default:
                break;
        }
    }
};

export const deleteTopping = (index: number): IDeleteToppingAction => {
    return {
        type: DELETE_TOPPING,
        index,
    };
};

export const sortToppings = (
    dragIndex: number,
    hoverIndex: number,
): ISortToppingsAction => {
    return {
        type: SORT_TOPPINGS,
        sortResult: { dragIndex, hoverIndex },
    };
};

export const clearBurgerConstructor = (): IClearBurgerConstructorAction => {
    return { type: CLEAR_BURGER_CONSTRUCTOR };
};

export const getTotalPrice = (burgerData: TBurgerData): ICalcTotalPrice => {
    const { bun, toppings } = burgerData;
    const bunsPrice: number = bun?.data?.price ? bun.data.price * 2 : 0;
    const toppingsPrice: number = toppings.reduce(
        (total: number, current: TIngredientData) => {
            const currentPrice: number =
                current?.data?.price ? current.data.price : 0;
            return total + currentPrice;
        }, 0
    );

    return {
        type: CALC_TOTAL_PRICE,
        totalPrice: (bunsPrice + toppingsPrice),
    };
};
