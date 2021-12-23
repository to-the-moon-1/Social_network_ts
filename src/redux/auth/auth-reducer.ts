import { FormAction, stopSubmit } from 'redux-form';
import { ResultCodeForCaptcha, ResultCodesEnum } from '../../api/api';
import authAPI from '../../api/auth-api';
import securityAPI from '../../api/security-api';
import { BaseThunkType, InferActionsTypes } from '../redux-store';

const SET_USER_DATA = 'SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'GET_CAPTCHA_URL_SUCCESS';

export type InitialStateType = {
  userId: number | null;
  email: string | null;
  login: string | null;
  isAuth: boolean;
  captchaUrl: string | null;
};

const initialState: InitialStateType = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null,
};

export const actions = {
  setAuthUserData: (
    userId: number | null,
    email: string | null,
    login: string | null,
    isAuth: boolean,
  ) => ({
    type: SET_USER_DATA,
    payload: { userId, email, login, isAuth },
  }),

  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: GET_CAPTCHA_URL_SUCCESS,
    payload: { captchaUrl },
  }),
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

const authReducer = ({ type, payload }: ActionsTypes, state = initialState): InitialStateType => {
  switch (type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default: {
      return state;
    }
  }
};

export const getAuthUserData = (): ThunkType => async dispatch => {
  const meData = await authAPI.me();

  if (meData.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = meData.data;
    dispatch(actions.setAuthUserData(id, email, login, true));
  }
};

export const getCaptchaUrl = (): ThunkType => async dispatch => {
  const data = await securityAPI.getCaptchaUrl();
  const captchaUrl = data.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType =>
    async dispatch => {
      const loginData = await authAPI.login(email, password, rememberMe, captcha);

      if (loginData.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
      }
      if (loginData.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      const message = loginData.messages.length > 0 ? loginData.messages[0] : 'Some error';
      dispatch(stopSubmit('login', { _error: message }));
    };

export const logout = (): ThunkType => async dispatch => {
  const response = await authAPI.logout();
  const { resultCode } = response.data as { resultCode: number };

  if (resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;
