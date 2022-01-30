import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { LoginFormValuesType } from '../../containers/LoginContainer';
import Input from '../common/FormsControls/Input';
import { required } from '../../utils/validators';

type LoginFormType = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
InjectedFormProps<LoginFormValuesType, LoginFormType> & LoginFormType
> = ({ handleSubmit, captchaUrl, error }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <Field
        className="input"
        component={Input}
        name="email"
        placeholder="Email"
        validate={[required]}
      />
    </div>
    <div>
      <Field
        className="input"
        component={Input}
        name="password"
        placeholder="Password"
        type="password"
        validate={[required]}
      />
    </div>
    <div className="wrapper-checkbox">
      <Field
        className="checkbox checkbox-login"
        component={Input}
        name="rememberMe"
        type="checkbox"
      />
      <span className="remember-me"> remember me</span>
    </div>{' '}
    <br />
    {captchaUrl && <img alt="" className="img-captcha" src={captchaUrl} />}
    {captchaUrl && (
      <Field
        className="input-small"
        component={Input}
        name="captcha"
        placeholder="Symbols from image"
        validate={[required]}
      />
    )}
    {error && <div className="form-summary-error">{error}</div>}
    <div>
      <button className="big-btn main-btn">Login</button>
    </div>
  </form>
);

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormType>({ form: 'login' })(LoginForm);

export default LoginReduxForm;
