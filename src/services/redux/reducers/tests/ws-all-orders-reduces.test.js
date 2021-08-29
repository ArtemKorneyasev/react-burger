import wsAllOrdersReducer from '../wsAllOrdersReducer';
import * as types from '../../actions/wsAllOrdersActions';
import { wsOrdersResultMock } from './mock';

const initialState = {
    wsAllOrdersConnected: false,
	allOrders: [],
	ordersTotal: 0,
	ordersTotalToday: 0,
	orderDetails: {},
};

describe('WS ALL ORDERS REDUCER', () => {
    it('should return the initial state', () => {
        expect(wsAllOrdersReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle WS_ALL_ORDERS_CONNECTION_SUCCESS', () => {
        expect(wsAllOrdersReducer(initialState, {
            type: types.WS_ALL_ORDERS_CONNECTION_SUCCESS,
        })).toEqual({
            ...initialState,
            wsAllOrdersConnected: true,
        });
    });

    it('should handle WS_ALL_ORDERS_CONNECTION_ERROR', () => {
        expect(wsAllOrdersReducer({
            ...initialState,
            wsAllOrdersConnected: true,
        }, {
            type: types.WS_ALL_ORDERS_CONNECTION_ERROR,
        })).toEqual({
            ...initialState,
            wsAllOrdersConnected: false,
        });
    });

    it('should handle WS_ALL_ORDERS_CONNECTION_CLOSED', () => {
        expect(wsAllOrdersReducer({
            ...initialState,
            wsAllOrdersConnected: true,
        }, {
            type: types.WS_ALL_ORDERS_CONNECTION_CLOSED,
        })).toEqual({
            ...initialState,
            wsAllOrdersConnected: false,
        });
    });

    it('should handle WS_GET_ALL_ORDERS', () => {
        expect(wsAllOrdersReducer(initialState, {
            type: types.WS_GET_ALL_ORDERS,
            payload: wsOrdersResultMock,
        })).toEqual({
            ...initialState,
            allOrders: wsOrdersResultMock.orders,
            ordersTotal: wsOrdersResultMock.total,
            ordersTotalToday: wsOrdersResultMock.totalToday,
        });
    });

    it('should handle WS_SHOW_ORDERS_DETAILS', () => {
        expect(wsAllOrdersReducer(initialState, {
            type: types.WS_SHOW_ORDERS_DETAILS,
            payload: wsOrdersResultMock.orders[0],
        })).toEqual({
            ...initialState,
            orderDetails: wsOrdersResultMock.orders[0],
        });
    });

    it('should handle WS_CLEAR_ORDERS_DETAILS', () => {
        expect(wsAllOrdersReducer({
            ...initialState,
            orderDetails: wsOrdersResultMock.orders[0],
        }, {
            type: types.WS_CLEAR_ORDERS_DETAILS,
        })).toEqual({
            ...initialState,
            orderDetails: {},
        });
    });
});
