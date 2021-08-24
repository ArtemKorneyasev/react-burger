import thunkMiddleware from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { socketAllOrdersMiddleware } from './middleware/socketAllOrdersMiddleware';
import {
    WS_ALL_ORDERS_CONNECTION_START,
    WS_ALL_ORDERS_CONNECTION_SUCCESS,
    WS_ALL_ORDERS_CONNECTION_ERROR,
    WS_ALL_ORDERS_CONNECTION_CLOSED,
    WS_GET_ALL_ORDERS,
} from '../redux/actions/wsAllOrdersActions';

const wsAllOrdersUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsAllOrdersActions = {
    wsAllOrdersInit: WS_ALL_ORDERS_CONNECTION_START,
    onOpenAllOrders: WS_ALL_ORDERS_CONNECTION_SUCCESS,
    onErrorAllOrders: WS_ALL_ORDERS_CONNECTION_ERROR,
    onCloseAllOrders: WS_ALL_ORDERS_CONNECTION_CLOSED,
    getAllOrders: WS_GET_ALL_ORDERS,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunkMiddleware,
        socketAllOrdersMiddleware(wsAllOrdersUrl, wsAllOrdersActions),
    ),
);

export const initStore = (initialState = {}) => createStore(rootReducer, initialState, enhancer);
