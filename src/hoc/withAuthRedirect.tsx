import React, { FC } from 'react';
import { Redirect } from 'react-router-dom';
import { connect, ConnectedComponent } from 'react-redux';
import { AppStateType } from '../redux/redux-store';

const mapStateToPropsForRedirect = (state: {
  authReducer: { isAuth: boolean };
}): { isAuth: boolean } => ({ isAuth: state.authReducer.isAuth });

type MapPropsType = {
  isAuth: boolean;
};

type UnknownObj = Record<string, any>;

type DispatchPropsType = UnknownObj;
type PropsType = MapPropsType & DispatchPropsType;

const withAuthRedirect = <WCP extends UnknownObj>(
  WrappedComponent: React.ComponentType<WCP>,
): ConnectedComponent<FC<PropsType>, Omit<PropsType, string> & WCP> => {
  const RedirectComponent: React.FC<PropsType> = props => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to="/login" />;

    return <WrappedComponent {...(restProps as WCP)} />;
  };

  const connectedAuthRedirectComponent = connect<
  MapPropsType,
  DispatchPropsType,
  WCP,
  AppStateType
  >(
    mapStateToPropsForRedirect,
    {},
  )(RedirectComponent);

  return connectedAuthRedirectComponent;
};

export default withAuthRedirect;
