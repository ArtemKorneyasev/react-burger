import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './reducers';
import { socketAllOrdersMiddleware } from './middleware/socketAllOrdersMiddleware';
import { socketUserOrdersMiddleware } from './middleware/socketUserOrdersMiddleware';
import {
    WS_ALL_ORDERS_CONNECTION_START,
    WS_ALL_ORDERS_CONNECTION_SUCCESS,
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_GET_ALL_ORDERS,
} from '../redux/constants/wsAllOrders';
import {
    WS_USER_ORDERS_CONNECTION_START,
    WS_USER_ORDERS_CONNECTION_SUCCESS,
    WS_USER_ORDERS_CONNECTION_ERROR,
    WS_USER_ORDERS_CONNECTION_CLOSED,
    WS_GET_USER_ORDERS,
} from '../redux/constants/wsUserOrders';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsAllOrdersActions = {
    wsAllOrdersInit: WS_ALL_ORDERS_CONNECTION_START,
    onOpenAllOrders: WS_ALL_ORDERS_CONNECTION_SUCCESS,
    onErrorAllOrders: WS_ALL_ORDERS_CONNECTION_ERROR,
    onCloseAllOrders: WS_ALL_ORDERS_CONNECTION_CLOSED,
    getAllOrders: WS_GET_ALL_ORDERS,
};
const wsUserOrdersActions = {
    wsUserOrdersInit: WS_USER_ORDERS_CONNECTION_START,
    onOpenUserOrders: WS_USER_ORDERS_CONNECTION_SUCCESS,
    onErrorUserOrders: WS_USER_ORDERS_CONNECTION_ERROR,
    onCloseUserOrders: WS_USER_ORDERS_CONNECTION_CLOSED,
    getUserOrders: WS_GET_USER_ORDERS,
};

const middlewares = [
    thunkMiddleware,
    socketAllOrdersMiddleware(wsUrl, wsAllOrdersActions),
    socketUserOrdersMiddleware(wsUrl, wsUserOrdersActions),
];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

export const initStore = createStore(rootReducer, composedEnhancers);
