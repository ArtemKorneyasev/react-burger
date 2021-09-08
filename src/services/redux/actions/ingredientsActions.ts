import {
    INGREDIENTS_REQUEST,
    INGREDIENTS_REQUEST_SUCCESS,
    INGREDIENTS_REQUSET_FAILED,
    SHOW_INGREDIENT_INFO,
    CLEAR_INGREDIENT_INFO,
} from '../constants/ingredients';
import { getIngredientsRequest } from '../../api';
import { AppThunk, AppDispatch } from '../thunk-types';
import { TIngredient } from '../../types';

export interface IIngredientsRequestAction {
    readonly type: typeof INGREDIENTS_REQUEST;
}

export interface IIngredientsRequestSuccessAction {
    readonly type: typeof INGREDIENTS_REQUEST_SUCCESS;
    readonly ingredients: ReadonlyArray<TIngredient>;
}

export interface IIngredientsRequestFailedAction {
    readonly type: typeof INGREDIENTS_REQUSET_FAILED;
    readonly error: string,
}

export interface IShowIngredientInfoAction {
    readonly type: typeof SHOW_INGREDIENT_INFO;
    readonly data: TIngredient,
}

export interface IClearIngredientInfoAction {
    readonly type: typeof CLEAR_INGREDIENT_INFO;
}

export type TIngredientsActions =
    | IIngredientsRequestAction
    | IIngredientsRequestSuccessAction
    | IIngredientsRequestFailedAction
    | IShowIngredientInfoAction
    | IClearIngredientInfoAction;

export const getIngredientsRequestAction = (): IIngredientsRequestAction => ({
        type: INGREDIENTS_REQUEST,
});

export const getIngredientsRequestSuccessAction = (
    ingredients: ReadonlyArray<TIngredient>,
): IIngredientsRequestSuccessAction => ({
    type: INGREDIENTS_REQUEST_SUCCESS,
    ingredients,
});

export const getIngredientsRequestFailed = (
    error: string,
): IIngredientsRequestFailedAction => ({
    type: INGREDIENTS_REQUSET_FAILED,
    error,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
    dispatch(getIngredientsRequestAction());
    getIngredientsRequest().then(response => {
        if (response && response.success) {
            dispatch(getIngredientsRequestSuccessAction(response.data));
        }
    }).catch(() => {
        dispatch(getIngredientsRequestFailed('Ошибка получения данных...'));
    });
};

export const showIngredientInfo = (data: TIngredient): IShowIngredientInfoAction => {
    return { type: SHOW_INGREDIENT_INFO, data };
};

export const clearIngredientInfo = (): IClearIngredientInfoAction => {
    return { type: CLEAR_INGREDIENT_INFO };
};
