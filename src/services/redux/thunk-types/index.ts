import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator, Dispatch } from 'redux';

import { initStore as store } from '../store';
import { TConstructorActions } from '../actions/constructorActions';
import { TIngredientsActions } from '../actions/ingredientsActions';
import { TModalActions } from '../actions/modalActions';
import { TOrderActions } from '../actions/orderActions';
import { TUserActions } from '../actions/userActions';
import { TWsAllOrdersActions } from '../actions/wsAllOrdersActions';
import { TWsUserOrdersActions } from '../actions/wsUserOrdersActions';

export type RootState = ReturnType<typeof store.getState>;
type TApplicationActions =
  | TConstructorActions
  | TIngredientsActions
  | TModalActions
  | TOrderActions
  | TUserActions
  | TWsAllOrdersActions
  | TWsUserOrdersActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;
export type AppDispatch = Dispatch<TApplicationActions>;
