import {
    INGREDIENTS_REQUEST,
	INGREDIENTS_REQUEST_SUCCESS,
	INGREDIENTS_REQUSET_FAILED,
	SHOW_INGREDIENT_INFO,
	CLEAR_INGREDIENT_INFO,
} from '../actions/ingredientsActions';

const initialState = {
	inProgress: false,
    ingredients: [],
	ingredientsError: '',
	ingredientInfo: {},
};

const ingredientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case INGREDIENTS_REQUEST:
			return {
				...state,
				inProgress: true,
			};
		case INGREDIENTS_REQUEST_SUCCESS:
			return {
                ...state,
				inProgress: false,
                ingredients: action.payload,
            };
		case INGREDIENTS_REQUSET_FAILED:
			return {
                ...state,
				inProgress: false,
                ingredientsError: action.payload,
            };
		case SHOW_INGREDIENT_INFO:
			return {
				...state,
				ingredientInfo: action.payload,
			};
		case CLEAR_INGREDIENT_INFO:
			return {
				...state,
				ingredientInfo: {},
			};
		default:
			return state;
	}
};

export default ingredientsReducer;
