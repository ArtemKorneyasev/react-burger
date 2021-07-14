import {
	INGREDIENTS_FETCH,
	INGREDIENTS_ERROR,
	ADD_BUN,
	ADD_TOPPING,
	DELETE_TOPPING,
	MAKE_ORDER,
	ORDER_ERROR,
	CLOSE_MODAL,
	CALC_TOTAL_PRICE,
} from '../actions/appActions';

export const appReducer = (state, action) => {
    switch (action.type) {
		case INGREDIENTS_FETCH:
			return { ...state, ingredients: action.payload };
		case INGREDIENTS_ERROR:
			return { ...state, ingredientsError: action.payload };
		case ADD_BUN:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					bun: action.payload,
				},
				modalMode: 'ingredient-details',
				modalIsOpen: true,
				ingredientInfo: action.payload,
			};
		case ADD_TOPPING:
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: [...state.burgerData.toppings, action.payload],
				},
				modalMode: 'ingredient-details',
				modalIsOpen: true,
				ingredientInfo: action.payload,
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
			return { ...state, modalIsOpen: false };
		case CALC_TOTAL_PRICE:
			return { ...state, totalPrice: action.payload };
		default:
			return state;
	}
};
