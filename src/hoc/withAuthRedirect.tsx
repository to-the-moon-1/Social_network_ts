import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedComponent } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

const mapStateToPropsForRedirect = (state: { auth: { isAuth: boolean } }): { isAuth: boolean } => ({
  isAuth: state.auth.isAuth,
});

type MapPropsType = {
  isAuth: boolean;
};

type DispatchPropsType = Record<string, any>;

function withAuthRedirect<WCP>(
  WrappedComponent: React.ComponentType<WCP>,
): ConnectedComponent<
  FC<MapPropsType & DispatchPropsType>,
  Omit<MapPropsType & DispatchPropsType, string> & WCP
  > {
  const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = props => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to="/login" />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  const ConnectedAuthRedirectComponent = connect<
  MapPropsType,
  DispatchPropsType,
  WCP,
  AppStateType
  >(
    mapStateToPropsForRedirect,
    {},
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
}

export default withAuthRedirect;
