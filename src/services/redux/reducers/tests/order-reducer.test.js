import orderReducer from '../orderReducer';
import * as types from '../../actions/orderActions';
import { orderResultMock } from './mock';

const initialState = {
	inProgress: false,
    orderResult: {},
	orderError: '',
};

describe('ORDER REDUCER', () => {
    it('should return the initial state', () => {
        expect(orderReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle MAKE_ORDER_REQUEST', () => {
        expect(orderReducer(initialState, {
            type: types.MAKE_ORDER_REQUEST,
        })).toEqual({
            ...initialState,
            inProgress: true,
        });
    });

    it('should handle MAKE_ORDER_REQUEST_SUCCESS', () => {
        expect(orderReducer({
            ...initialState,
            inProgress: true,
        }, {
            type: types.MAKE_ORDER_REQUEST_SUCCESS,
            payload: orderResultMock,
        })).toEqual({
            ...initialState,
            inProgress: false,
            orderResult: orderResultMock,
        });
    });

    it('should handle MAKE_ORDER_REQUEST_ERROR', () => {
        expect(orderReducer({
            ...initialState,
            inProgress: true,
        }, {
            type: types.MAKE_ORDER_REQUEST_ERROR,
            payload: 'Ошибка получения данных...',
        })).toEqual({
            ...initialState,
            inProgress: false,
            orderError: 'Ошибка получения данных...',
        });
    });
});
