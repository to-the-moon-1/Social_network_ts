import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuth, selectLogin } from '../redux/auth/auth-selectors';
import { logout } from '../redux/auth/auth-reducer';
import AppHeader from '../components/Header/Header';

import '../styles/Header.css';

const AppHeaderContainer: React.FC = () => {
  const isAuth = useSelector(selectIsAuth);
  const loginCallback = useSelector(selectLogin);

  const dispatch = useDispatch();

  const logoutCallback = (): void => {
    dispatch(logout());
  };

  return (
    <AppHeader isAuth={isAuth} loginCallback={loginCallback} logoutCallback={logoutCallback} />
  );
};

export default AppHeaderContainer;
