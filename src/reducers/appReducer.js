export const appReducer = (state, action) => {
    switch (action.type) {
		case 'ingredientsFetch':
			return { ...state, ingredients: action.payload };
		case 'ingredientsError':
			return { ...state, ingredientsError: true };
		case 'addBun':
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
		case 'addTopping':
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
		case 'removeTopping':
			return {
				...state,
				burgerData: {
					...state.burgerData,
					toppings: state.burgerData.toppings.filter((topping, index) =>
						index !== action.payload,
					),
				},
			};
		case 'makeOrder':
			return {
				...state,
				modalMode: 'order-details',
				modalIsOpen: true,
				
				orderDetails: action.payload,
			};
		case 'orderError':
			return {
				...state,
				modalMode: 'order-details',
				modalIsOpen: true,
				orderError: action.payload,
			};
		case 'closeModal':
			return { ...state, modalIsOpen: false };
		case 'calcTotalPrice':
			return { ...state, totalPrice: action.payload };
		default:
			throw new Error(`Unknown action type: ${action.type}`);
	}
};
