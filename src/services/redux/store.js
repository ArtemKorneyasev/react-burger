import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import { rootReducer } from './reducers';
import { socketMiddleware } from './middleware/socketMiddleware';
import {
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_ORDERS,
    WS_SEND_ORDERS_REQUEST,
} from '../redux/actions/wsActions';

const wsUrl = 'wss://norma.nomoreparties.space/orders';
const wsActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onError: WS_CONNECTION_ERROR,
    onClose: WS_CONNECTION_CLOSED,
    onMessage: WS_GET_ORDERS,
    wsSendMessage: WS_SEND_ORDERS_REQUEST,
};

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        thunk,
        socketMiddleware(wsUrl, wsActions),
    ),
);

export const initStore = (initialState = {}) => createStore(rootReducer, initialState, enhancer);
