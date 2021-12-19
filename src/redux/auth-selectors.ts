export const selectIsAuth = (state: { auth: { isAuth: boolean } }): boolean => state.auth.isAuth;

export const selectLogin = (state: { auth: { login: string } }): string => state.auth.login;
