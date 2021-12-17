import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {LoginFormValuesType} from "./LoginContainer";
import {Input} from "../common/FormsControls/Input";
import {required} from "../../utils/validators/validators";

type PropsType = {
    captchaUrl: string | null,
}

const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, PropsType> & PropsType> = ({handleSubmit, captchaUrl, error}) => (
            <form onSubmit={handleSubmit}>
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
)

const LoginReduxForm = reduxForm<LoginFormValuesType, PropsType>({form: 'login'}) (LoginForm)

export default LoginReduxForm;
