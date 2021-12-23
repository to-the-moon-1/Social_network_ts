import { Dispatch } from 'redux';
import { getAuthUserData } from './auth/auth-reducer';
import { InferActionsTypes } from './redux-store';

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

type AppState = { initialized: boolean };

const initialState: AppState = { initialized: false };

export const actions = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS }),
};

export type InitialStateType = typeof initialState;
type ActionsType = InferActionsTypes<typeof actions>;

const appReducer = (action: ActionsType, state = initialState): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default: {
      return state;
    }
  }
};

export const initializeApp = () => (dispatch: Dispatch) => {
  const promise = dispatch(getAuthUserData());
  Promise.all([promise]).then(() => {
    dispatch(actions.initializedSuccess());
  });
};

export default appReducer;
