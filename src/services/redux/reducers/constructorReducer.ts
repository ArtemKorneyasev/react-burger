import {
    ADD_BUN,
	ADD_TOPPING,
	DELETE_TOPPING,
	SORT_TOPPINGS,
	CLEAR_BURGER_CONSTRUCTOR,
	CALC_TOTAL_PRICE,
} from '../constants/constructor';
import { TConstructorActions } from '../actions/constructorActions';
import { TIngredientData } from '../../types';
import { moveInArray } from '../../helpers';

type TConstructorState = {
	burgerData: {
		bun: TIngredientData | null,
		toppings: ReadonlyArray<TIngredientData>,
	},
	readonly totalPrice: number,
};

const initialState: TConstructorState = {
    burgerData: {
		bun: null,
		toppings: [],
	},
	totalPrice: 0,
};

const constructorReducer = (
	state = initialState,
	action: TConstructorActions,
): TConstructorState => {
	switch (action.type) {
		case ADD_BUN:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					bun: action.ingredientData,
				},
			};
		case ADD_TOPPING:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: [...state.burgerData.toppings, action.ingredientData],
				},
			};
		case DELETE_TOPPING:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: state.burgerData.toppings.filter((topping, index) =>
						index !== action.index,
					),
				},
			};
		case SORT_TOPPINGS:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: moveInArray(
						[...state.burgerData.toppings],
						action.sortResult.dragIndex,
						action.sortResult.hoverIndex,
					),
				},
			};
		case CLEAR_BURGER_CONSTRUCTOR:
			return {
				...state,
				burgerData: {
					bun: null,
					toppings: [],
				},
			};
		case CALC_TOTAL_PRICE:
				return { ...state, totalPrice: action.totalPrice };
		default:
			return state;
	}
};

export default constructorReducer;
