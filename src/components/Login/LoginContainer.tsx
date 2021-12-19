import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { login } from '../../redux/auth-reducer';
import Login from './Login';

import './Login.css';

export type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

const LoginContainer: React.FC = () => {
  const captchaUrls = useSelector(
    (state: { auth: { captchaUrl: string | null } }) => state.auth.captchaUrl,
  );
  const isAuths = useSelector((state: { auth: { isAuth: boolean } }) => state.auth.isAuth);

  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType): void => {
    dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
  };

  if (isAuths) return <Redirect to="/profile" />;

  return <Login captchaUrl={captchaUrls} onSubmit={onSubmit} />;
};

export default LoginContainer;
