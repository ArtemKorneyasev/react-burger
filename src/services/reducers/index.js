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
	CLEAR_ORDER_ERROR,
	OPEN_INGREDIENT_MODAL,
	OPEN_ORDER_MODAL,
	CLOSE_MODAL,
	CALC_TOTAL_PRICE,
} from '../actions';

const ingredientsReducer = (state = {
	ingredients: [],
	ingredientsError: '',
	ingredientInfo: {},
}, action) => {
	switch (action.type) {
		case INGREDIENTS_FETCH:
			return { ...state, ingredients: action.payload };
		case INGREDIENTS_ERROR:
			return { ...state, ingredientsError: action.payload };
		case SHOW_INGREDIENT_INFO:
			return {
				...state,
				ingredientInfo: action.payload,
			};
		default:
			return state;
	}
};

const constructorReducer = (state = {
	burgerData: {
		bun: {},
		toppings: [],
	},
	totalPrice: 0,
}, action) => {
	switch (action.type) {
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
		case CALC_TOTAL_PRICE:
				return { ...state, totalPrice: action.payload };
		default:
			return state;
	}
}

const orderReducer = (state = {
	orderDetails: {},
	orderError: '',
}, action) => {
	switch (action.type) {
		case MAKE_ORDER:
			return {
				...state,
				orderDetails: action.payload,
			};
		case ORDER_ERROR:
			return {
				...state,
				orderError: action.payload,
			};
		case CLEAR_ORDER_ERROR:
			return {
				...state,
				orderError: '',
			}
		default:
			return state;
	}
}

const modalReducer = (state = {
	modalMode: '',
	modalIsOpen: false,
}, action) => {
	switch (action.type) {
		case OPEN_INGREDIENT_MODAL:
			return {
				...state,
				modalMode: 'ingredient-details',
				modalIsOpen: true,
			}
		case OPEN_ORDER_MODAL:
			return {
				...state,
				modalMode: 'order-details',
				modalIsOpen: true,
			}
		case CLOSE_MODAL:
			return {
				...state,
				modalMode: '',
				modalIsOpen: false,
			};
		default:
			return state;
	}
};

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: constructorReducer,
	order: orderReducer,
	modal: modalReducer,
});
