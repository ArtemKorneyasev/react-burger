import wsUserOrdersReducer from '../wsUserOrdersReducer';
import * as types from '../../actions/wsUserOrdersActions';
import { wsOrdersResultMock } from './mock';

const initialState = {
    wsUserOrdersConnected: false,
	userOrders: [],
};

describe('WS USER ORDERS REDUCER', () => {
    it('should return the initial state', () => {
        expect(wsUserOrdersReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_USER_ORDERS_CONNECTION_SUCCESS', () => {
        expect(wsUserOrdersReducer(initialState, {
            type: types.WS_USER_ORDERS_CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState,
            wsUserOrdersConnected: true,
        });
    });

    it('should handle WS_USER_ORDERS_CONNECTION_ERROR', () => {
        expect(wsUserOrdersReducer({
            ...initialState,
            wsUserOrdersConnected: true,
        }, {
            type: types.WS_USER_ORDERS_CONNECTION_ERROR,
        })).toEqual({
            ...initialState,
            wsUserOrdersConnected: false,
        });
    });

    it('should handle WS_USER_ORDERS_CONNECTION_CLOSED', () => {
        expect(wsUserOrdersReducer({
            ...initialState,
            wsUserOrdersConnected: true,
        }, {
            type: types.WS_USER_ORDERS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            wsUserOrdersConnected: false,
        });
    });

    it('should handle WS_GET_USER_ORDERS', () => {
        expect(wsUserOrdersReducer(initialState, {
            type: types.WS_GET_USER_ORDERS,
            payload: wsOrdersResultMock,
        })).toEqual({
            ...initialState,
            userOrders: wsOrdersResultMock.orders,
        });
    });
});
