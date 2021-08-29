import ingredientsReducer from '../ingredientsReducer';
import * as types from '../../actions/ingredientsActions';
import { ingredientsMock } from './mock';

const initialState = {
    inProgress: false,
    ingredients: [],
	ingredientsError: '',
	ingredientInfo: {},
};

describe('INGREDIENTS REDUCER', () => {
    it('should return the initial state', () => {
        expect(ingredientsReducer(undefined, {})).toEqual(initialState);
    });

    it('should handle INGREDIENTS_REQUEST', () => {
        expect(ingredientsReducer(initialState, {
            type: types.INGREDIENTS_REQUEST,
        })).toEqual({
            ...initialState,
            inProgress: true,
        });
    });

    it('should handle INGREDIENTS_REQUEST_SUCCESS', () => {
        expect(ingredientsReducer({
            ...initialState,
            inProgress: true,
        }, {
            type: types.INGREDIENTS_REQUEST_SUCCESS,
            payload: ingredientsMock,
        })).toEqual({
            ...initialState,
            inProgress: false,
            ingredients: ingredientsMock,
        });
    });

    it('should handle INGREDIENTS_REQUSET_FAILED', () => {
        expect(ingredientsReducer({
            ...initialState,
            inProgress: true,
        }, {
            type: types.INGREDIENTS_REQUSET_FAILED,
            payload: 'Ошибка получения данных...',
        })).toEqual({
            ...initialState,
            inProgress: false,
            ingredientsError: 'Ошибка получения данных...',
        });
    });

    it('should handle SHOW_INGREDIENT_INFO', () => {
        expect(ingredientsReducer(initialState, {
            type: types.SHOW_INGREDIENT_INFO,
            payload: ingredientsMock[0],
        })).toEqual({
            ...initialState,
            ingredientInfo: ingredientsMock[0],
        });
    });

    it('should handle CLEAR_INGREDIENT_INFO', () => {
        expect(ingredientsReducer({
            ...initialState,
            ingredientInfo: ingredientsMock[0],
        }, {
            type: types.CLEAR_INGREDIENT_INFO,
        })).toEqual(initialState);
    });
});
