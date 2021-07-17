import { combineReducers } from 'redux';
import { moveInArray } from '../helpers';
import {
	INGREDIENTS_FETCH,
	INGREDIENTS_ERROR,
	SHOW_INGREDIENT_INFO,
	ADD_BUN,
	ADD_TOPPING,
	DELETE_TOPPING,
	SORT_TOPPINGS,
	MAKE_ORDER,
	ORDER_ERROR,
	CLOSE_MODAL,
	CALC_TOTAL_PRICE,
} from '../actions';

const initialState = {
	ingredients: [],
	ingredientsError: '',
	ingredientInfo: {},
	burgerData: {
		bun: {},
		toppings: [],
	},
	orderDetails: {},
	orderError: '',
	modalMode: '',
	modalIsOpen: false,
	totalPrice: 0,
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
		case INGREDIENTS_FETCH:
			return { ...state, ingredients: action.payload };
		case INGREDIENTS_ERROR:
			return { ...state, ingredientsError: action.payload };
		case SHOW_INGREDIENT_INFO:
			return {
				...state,
				modalMode: 'ingredient-details',
				modalIsOpen: true,
				ingredientInfo: action.payload,
			};
		case ADD_BUN:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					bun: action.payload,
				},
			};
		case ADD_TOPPING:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: [...state.burgerData.toppings, action.payload],
				},
			};
		case DELETE_TOPPING:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: state.burgerData.toppings.filter((topping, index) =>
						index !== action.payload,
					),
				},
			};
		case SORT_TOPPINGS:
			const { index, atIndex } = action.payload;
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: moveInArray(
						[...state.burgerData.toppings],
						index,
						atIndex,
					),
				},
			};
		case MAKE_ORDER:
			return {
				...state,
				modalMode: 'order-details',
				modalIsOpen: true,			
				orderDetails: action.payload,
			};
		case ORDER_ERROR:
			return {
				...state,
				modalMode: 'order-details',
				modalIsOpen: true,
				orderError: action.payload,
			};
		case CLOSE_MODAL:
			return {
				...state,
				ingredientInfo: {},
				modalIsOpen: false,
				modalMode: '',
				orderError: '',
			};
		case CALC_TOTAL_PRICE:
			return { ...state, totalPrice: action.payload };
		default:
			return state;
	}
};

export const rootReducer = combineReducers({ app: appReducer });
