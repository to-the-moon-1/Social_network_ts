import { Action, applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import profileReducer from './profile-reducer';
import dialogsReducer from './dialogs-reducer';
import sidebarReducer from './sidebar-reducer';
import usersReducer from './users-reducer';
import authReducer from './auth-reducer';
import appReducer from './app-reducer';
import chatReducer from './chat-reducer';

const reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
  chat: chatReducer,
});

type ReducersType = typeof reducers;
export type AppStateType = ReturnType<ReducersType>;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
R,
AppStateType,
unknown,
A
>;

export type InferActionsTypes<T> = T extends { [key: string]: (...args: any[]) => infer U }
  ? U
  : never;

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
