import React from 'react';
import classes from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../common/FormsControls/FormsControl";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from 'react-router-dom';
import {AppStateType} from "../../redux/redux-store";

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
                <div className={classes.remember}>
                    <Field className={classes.checkbox} type={'checkbox'} name={'rememberMe'} component={Input} /> remember me
                </div> <br />
                {captchaUrl && <img className={classes.captchaImg} src={captchaUrl} alt={''} />}
                {captchaUrl && <Field className={classes.inputSmall} placeholder={'Symbols from image'} name={'captcha'} component={Input} validate={[required]} />}
                {error && <div className={classes.formSummaryError}>
                    {error}
                </div>}
                <div>
                    <button className='setBtn mainBtn'>Login</button>
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

    return <div className={classes.wrapPage}>
        <h1 className={classes.h1}>Please, log in</h1>
        <hr className={classes.hr} />
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
}

export default Login;






// type MapStatePropsType = {
//     captchaUrl: string | null,
//     isAuth: boolean,
// }

// type MapDispatchPropsType = {
//     login: (email: string, password: string, rememberMe: boolean, captcha: string) => void,
// }

// const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
//     captchaUrl: state.auth.captchaUrl,
//     isAuth: state.auth.isAuth
// })

// export default connect(null, {login}) (Login);