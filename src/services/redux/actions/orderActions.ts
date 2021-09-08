import {
    MAKE_ORDER_REQUEST,
    MAKE_ORDER_REQUEST_SUCCESS,
    MAKE_ORDER_REQUEST_FAILED,
    CLEAR_ORDER_RESULT,
    CLEAR_ORDER_ERROR,
} from '../constants/order';
import { getOrderRequest } from '../../api';
import { AppThunk, AppDispatch } from '../thunk-types';
import { TBurgerData, TMakeOrderResult } from '../../types';

export interface IMakeOrderRequestAction {
    readonly type: typeof MAKE_ORDER_REQUEST;
}

export interface IMakeOrderRequestSuccessAction {
    readonly type: typeof MAKE_ORDER_REQUEST_SUCCESS;
    readonly orderResult: TMakeOrderResult;
}

export interface IMakeOrderRequestFailed {
    readonly type: typeof MAKE_ORDER_REQUEST_FAILED;
    readonly error: string;
}

export interface IClearOrderResultAction {
    readonly type: typeof CLEAR_ORDER_RESULT;
}

export interface IClearOrderErrorAction {
    readonly type: typeof CLEAR_ORDER_ERROR;
}

export type TOrderActions =
    | IMakeOrderRequestAction
    | IMakeOrderRequestSuccessAction
    | IMakeOrderRequestFailed
    | IClearOrderResultAction
    | IClearOrderErrorAction;

export const getOrderRequestAction = (): IMakeOrderRequestAction => ({
    type: MAKE_ORDER_REQUEST,
});

export const getOrderRequestSuccessAction = (
    orderResult: TMakeOrderResult,
): IMakeOrderRequestSuccessAction => ({
    type: MAKE_ORDER_REQUEST_SUCCESS,
    orderResult,
});

export const getOrderResultFailedAction = (
    error: string,
): IMakeOrderRequestFailed => ({
    type: MAKE_ORDER_REQUEST_FAILED,
    error,
});

export const getOrderResult: AppThunk = (
    burgerData: TBurgerData,
) => (dispatch: AppDispatch) => {
    dispatch(getOrderRequestAction());
    const { bun } = burgerData;

    if (bun && bun.uniqueId) {
        const requestData: {
            ingredients: Array<string>,
        } = { ingredients: [] };
        Object.keys(burgerData).map(ingredientType => {
            switch (ingredientType) {
                case 'bun':
                    if (burgerData.bun && burgerData.bun.data) {
                        requestData.ingredients.push(burgerData.bun.data._id);
                    }
                    break;
                case 'toppings':
                    burgerData.toppings.map(
                        ingredient => ingredient.data &&
                        requestData.ingredients.push(ingredient.data._id),
                    );
                    break;
                default:
                    break;
            }
        }),

        getOrderRequest(requestData).then(response => {
            if (response && response.success) {
                dispatch(getOrderRequestSuccessAction(response));
            }
        }).catch(() => {
            dispatch(getOrderResultFailedAction('Ошибка получения данных...'));
        });
    } else {
        dispatch(getOrderResultFailedAction('Должна быть выбрана булка для бургера!'));
    }
};

export const clearOrderResult = (): IClearOrderResultAction => {
    return { type: CLEAR_ORDER_RESULT };
};

export const clearOrderError = (): IClearOrderErrorAction => {
    return { type: CLEAR_ORDER_ERROR };
};
