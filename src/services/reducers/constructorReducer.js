import {
    ADD_BUN,
	ADD_TOPPING,
	DELETE_TOPPING,
	SORT_TOPPINGS,
	CALC_TOTAL_PRICE,
} from '../actions/constructorActions';
import { moveInArray } from '../helpers';

const initialState = {
    burgerData: {
		bun: {},
		toppings: [],
	},
	totalPrice: 0,
};

const constructorReducer = (state = initialState, action) => {
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
};

export default constructorReducer;
