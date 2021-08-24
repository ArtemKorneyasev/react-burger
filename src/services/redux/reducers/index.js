import { combineReducers } from 'redux';
import ingredientsReducer from './ingredientsReducer';
import constructorReducer from './constructorReducer';
import orderReducer from './orderReducer';
import modalReducer from './modalReducer';
import userReducer from './userReducer';
import wsAllOrdersReducer from './wsAllOrdersReducer';

export const rootReducer = combineReducers({
	ingredients: ingredientsReducer,
	burger: constructorReducer,
	order: orderReducer,
	modal: modalReducer,
	user: userReducer,
	wsAllOrders: wsAllOrdersReducer,
});
