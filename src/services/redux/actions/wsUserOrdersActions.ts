import {
    WS_USER_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS,
} from '../constants/wsUserOrders';
import { TGetOrdersResult } from '../../types';

export interface IWsUserOrdersConnectionStartAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_START;
}

export interface IWsUserOrdersConnectionSuccessAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsUsersOrdersConnectionErrorAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_ERROR;
}

export interface IWsUsersOrdersConnectionClosedAction {
    readonly type: typeof WS_USER_ORDERS_CONNECTION_CLOSED;
}

export interface IWsGetUserOrdersAction {
    readonly type: typeof WS_GET_USER_ORDERS;
    ordersResult: TGetOrdersResult;
}

export type TWsUserOrdersActions =
 | IWsUserOrdersConnectionStartAction
 | IWsUserOrdersConnectionSuccessAction
 | IWsUsersOrdersConnectionErrorAction
 | IWsUsersOrdersConnectionClosedAction
 | IWsGetUserOrdersAction;

export const wsUserOrdersConnectionStart = (): IWsUserOrdersConnectionStartAction => {
    return { type: WS_USER_ORDERS_CONNECTION_START };
};

export const wsUserOrdersConnectionSuccess = (): IWsUserOrdersConnectionSuccessAction => {
    return { type: WS_USER_ORDERS_CONNECTION_SUCCESS };
};

export const wsUserOrdersConnectionError = (): IWsUsersOrdersConnectionErrorAction => {
    return { type: WS_USER_ORDERS_CONNECTION_ERROR };
};

export const wsUserOrdersConnectionClosed = (): IWsUsersOrdersConnectionClosedAction => {
    return { type: WS_USER_ORDERS_CONNECTION_CLOSED };
};

export const wsGetUserOrders = (ordersResult: TGetOrdersResult): IWsGetUserOrdersAction => {
    return { type: WS_GET_USER_ORDERS, ordersResult };
};
