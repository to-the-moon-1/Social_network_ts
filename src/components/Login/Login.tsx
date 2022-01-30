import React from 'react';

import { LoginFormValuesType } from '../../containers/LoginContainer';
import LoginReduxForm from './LoginForm';

type PropTypes = {
  onSubmit: (formData: LoginFormValuesType) => void;
  captchaUrl: string | null;
};

const Login: React.FC<PropTypes> = ({ onSubmit, captchaUrl }) => (
  <div className="wrapper-login-form">
    <h1 className="main-head">Please, log in</h1>
    <hr className="hr" />
    <LoginReduxForm captchaUrl={captchaUrl} onSubmit={onSubmit} />
  </div>
);

export default Login;
