export const selectIsAuth = (state: { authReducer: { isAuth: boolean } }): boolean =>
  state.authReducer.isAuth;

export const selectLogin = (state: { authReducer: { login: string } }): string =>
  state.authReducer.login;
