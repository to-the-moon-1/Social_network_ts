import React from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";

import {login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";
import Login from "./Login";

import './Login.css';

export type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
}

const LoginContainer: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) return <Redirect to={'/profile'} />

    return <Login captchaUrl={captchaUrl} onSubmit={onSubmit} />
}

export default LoginContainer;
