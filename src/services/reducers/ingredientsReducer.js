import {
    INGREDIENTS_FETCH,
	INGREDIENTS_ERROR,
	SHOW_INGREDIENT_INFO,
} from '../actions/ingredientsActions';

const initialState = {
    ingredients: [],
	ingredientsError: '',
	ingredientInfo: {},
};

const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case INGREDIENTS_FETCH:
			return {
                ...state,
                ingredients: action.payload,
            };
		case INGREDIENTS_ERROR:
			return {
                ...state,
                ingredientsError: action.payload,
            };
		case SHOW_INGREDIENT_INFO:
			return {
				...state,
				ingredientInfo: action.payload,
			};
		default:
			return state;
	}
};

export default ingredientsReducer;
