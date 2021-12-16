import React from 'react';
import {Redirect} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {login} from "../../redux/auth-reducer";
import {AppStateType} from "../../redux/redux-store";

import './Login.css';

type LoginFormOwnProps = {
    captchaUrl: string | null,
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({handleSubmit, captchaUrl, error}) => {
    return  <form onSubmit={handleSubmit}>
                <div>
                    <Field className='input' placeholder={'Email'} name={'email'} component={Input} validate={[required]} />
                </div>
                <div>
                    <Field className='input' placeholder={'Password'} name={'password'} type={'password'} component={Input} validate={[required]} />
                </div>
                <div className="wrapper-checkbox">
                    <Field className="checkbox checkbox-login" type={'checkbox'} name={'rememberMe'} component={Input} /><span className="remember-me"> remember me</span>
                </div> <br />
                {captchaUrl && <img className="img-captcha" src={captchaUrl} alt={''} />}
                {captchaUrl && <Field className="input-small" placeholder={'Symbols from image'} name={'captcha'} component={Input} validate={[required]} />}
                {error && <div className="form-summary-error">
                    {error}
                </div>}
                <div>
                    <button className='big-btn main-btn'>Login</button>
                </div>
            </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'}) (LoginForm)

type LoginFormValuesType = {
    email: string,
    password: string,
    rememberMe: boolean,
    captcha: string,
}

const Login: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)

    const dispatch = useDispatch();

    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha))
    }

    if (isAuth) {
        return <Redirect to={'/profile'} />
    }

    return <div className="wrapper-login-form">
        <h1 className="main-head">Please, log in</h1>
        <hr className="hr" />
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}

export default Login;
