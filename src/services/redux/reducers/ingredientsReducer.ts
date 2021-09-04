import {
    INGREDIENTS_REQUEST,
	INGREDIENTS_REQUEST_SUCCESS,
	INGREDIENTS_REQUSET_FAILED,
	SHOW_INGREDIENT_INFO,
	CLEAR_INGREDIENT_INFO,
} from '../constants/ingredients';
import { TIngredientsActions } from '../actions/ingredientsActions';
import { TIngredient } from '../../types';

type TIngredientsState = {
	inProgress: boolean,
	ingredients: ReadonlyArray<TIngredient>,
	ingredientsError: string,
	ingredientInfo: TIngredient | null,
};

const initialState: TIngredientsState = {
	inProgress: false,
    ingredients: [],
	ingredientsError: '',
	ingredientInfo: null,
};

const ingredientsReducer = (
	state = initialState,
	action: TIngredientsActions,
): TIngredientsState => {
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
                ingredients: action.ingredients,
            };
		case INGREDIENTS_REQUSET_FAILED:
			return {
                ...state,
				inProgress: false,
                ingredientsError: action.error,
            };
		case SHOW_INGREDIENT_INFO:
			return {
				...state,
				ingredientInfo: action.data,
			};
		case CLEAR_INGREDIENT_INFO:
			return {
				...state,
				ingredientInfo: null,
			};
		default:
			return state;
	}
};

export default ingredientsReducer;
