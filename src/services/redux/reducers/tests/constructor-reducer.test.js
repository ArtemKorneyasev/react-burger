import constructorReducer from '../constructorReducer';
import * as types from '../../actions/constructorActions';
import { bunMock, toppingsMock } from './mock';

const initialState = {
    burgerData: {
		bun: {},
		toppings: [],
	},
	totalPrice: 0,
};

describe('CONSTRUCTOR REDUCER', () => {
    it('should return the initial state' , () => {
        expect(constructorReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle ADD_BUN', () => {
        expect(constructorReducer(initialState, {
            type: types.ADD_BUN,
            payload: bunMock,
        })).toEqual({
            burgerData: {
                bun: bunMock,
                toppings: [],
            },
            totalPrice: 0,
        });
    });

    it('should handle ADD_TOPPING', () => {
        expect(constructorReducer(initialState, {
            type: types.ADD_TOPPING,
            payload: toppingsMock[0],
        })).toEqual({
            burgerData: {
                bun: {},
                toppings: [toppingsMock[0]],
            },
            totalPrice: 0,
        });

        expect(constructorReducer({
            burgerData: {
                bun: {},
                toppings: [toppingsMock[0]],
            },
            totalPrice: 0,
        }, {
            type: types.ADD_TOPPING,
            payload: toppingsMock[1],
        })).toEqual({
            burgerData: {
                bun: {},
                toppings: [toppingsMock[0], toppingsMock[1]],
            },
            totalPrice: 0,
        });
    });

    it('should handle DELETE_TOPPING', () => {
        expect(constructorReducer({
            burgerData: {
                bun: {},
                toppings: [toppingsMock[0], toppingsMock[1]],
            },
            totalPrice: 0,
        }, {
            type: types.DELETE_TOPPING,
            payload: 1,
        })).toEqual({
            burgerData: {
                bun: {},
                toppings: [toppingsMock[0]],
            },
            totalPrice: 0,
        });
    });

    it('should handle CLEAR_BURGER_CONSTRUCTOR', () => {
        expect(constructorReducer({
            burgerData: {
                bun: bunMock,
                toppings: [toppingsMock[0], toppingsMock[1]],
            },
            totalPrice: 0,
        }, {
            type: types.CLEAR_BURGER_CONSTRUCTOR,
        })).toEqual(initialState);
    });

    it('should handle SORT_TOPPINGS', () => {
        expect(constructorReducer({
            burgerData: {
                bun: {},
                toppings: [toppingsMock[0], toppingsMock[1]],
            },
            totalPrice: 0,
        }, {
            type: types.SORT_TOPPINGS,
            payload: { dragIndex: 1, hoverIndex: 0 },
        })).toEqual({
            burgerData: {
                bun: {},
                toppings: [toppingsMock[1], toppingsMock[0]],
            },
            totalPrice: 0,
        });
    });

    it('should hanlde CALC_TOTAL_PRICE', () => {
        expect(constructorReducer({
            burgerData: {
                bun: bunMock,
                toppings: [],
            },
            totalPrice: 0,
        }, {
            type: types.CALC_TOTAL_PRICE,
            payload: 1976,
        })).toEqual({
            burgerData: {
                bun: bunMock,
                toppings: [],
            },
            totalPrice: 1976,
        });
    });
});
