import {
    WS_ALL_ORDERS_CONNECTION_START,
    WS_ALL_ORDERS_CONNECTION_SUCCESS,
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_GET_ALL_ORDERS,
    WS_SHOW_ORDERS_DETAILS,
    WS_CLEAR_ORDERS_DETAILS,
} from '../constants/wsAllOrders';
import {TOrder, TGetOrdersResult } from '../../types';

export interface IWsAllOrdersConnectionStartAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_START;
}

export interface IWsAllOrdersConnectionSuccessAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_SUCCESS;
}

export interface IWsAllOrdersConnectionErrorAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_ERROR;
}

export interface IWsAllOrdersConnectionClosedAction {
    readonly type: typeof WS_ALL_ORDERS_CONNECTION_CLOSED;
}

export interface IWsGetAllOrdersAction {
    readonly type: typeof WS_GET_ALL_ORDERS;
    ordersResult: TGetOrdersResult,
}

export interface IWsShowOrdersDetailsAction {
    readonly type: typeof WS_SHOW_ORDERS_DETAILS;
    order: TOrder,
}

export interface IWsClearOrdersDetailsAction {
    readonly type: typeof WS_CLEAR_ORDERS_DETAILS;
}

export type TWsAllOrdersActions =
 | IWsAllOrdersConnectionStartAction
 | IWsAllOrdersConnectionSuccessAction
 | IWsAllOrdersConnectionErrorAction
 | IWsAllOrdersConnectionClosedAction
 | IWsGetAllOrdersAction
 | IWsShowOrdersDetailsAction
 | IWsClearOrdersDetailsAction;

export const wsAllOrdersConnectionStart = (): IWsAllOrdersConnectionStartAction => {
    return { type: WS_ALL_ORDERS_CONNECTION_START };
};

export const wsAllOrdersConnectionSuccess = (): IWsAllOrdersConnectionSuccessAction => {
    return { type: WS_ALL_ORDERS_CONNECTION_SUCCESS };
};

export const wsAllOrdersConnectionError = (): IWsAllOrdersConnectionErrorAction=> {
    return { type: WS_ALL_ORDERS_CONNECTION_ERROR };
};

export const wsAllOrdersConnectionClosed = (): IWsAllOrdersConnectionClosedAction => {
    return { type: WS_ALL_ORDERS_CONNECTION_CLOSED };
};

export const wsGetAllOrders = (ordersResult: TGetOrdersResult): IWsGetAllOrdersAction => {
    return { type: WS_GET_ALL_ORDERS, ordersResult };
};

export const wsShowOrderDetails = (order: TOrder): IWsShowOrdersDetailsAction => {
    return { type: WS_SHOW_ORDERS_DETAILS, order };
};

export const wsClearOrderDetails = (): IWsClearOrdersDetailsAction => {
    return { type: WS_CLEAR_ORDERS_DETAILS };
};
