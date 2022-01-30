import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../redux/auth/auth-reducer';
import Login from '../components/Login/Login';

import '../styles/Login.css';

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

const LoginContainer: React.FC = () => {
  const captchaUrls = useSelector(
    (state: { authReducer: { captchaUrl: string | null } }) => state.authReducer.captchaUrl,
  );
  const isAuths = useSelector(
    (state: { authReducer: { isAuth: boolean } }) => state.authReducer.isAuth,
  );

  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType): void => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };

  if (isAuths) return <Redirect to="/profile" />;

  return <Login captchaUrl={captchaUrls} onSubmit={onSubmit} />;
};

export default LoginContainer;
