import React from 'react';

import {LoginFormValuesType} from "./LoginContainer";
import LoginReduxForm from "./LoginForm";

type PropTypes = {
    onSubmit: (formData: LoginFormValuesType) => void,
    captchaUrl: string | null,
}

const Login: React.FC<PropTypes> = ({onSubmit, captchaUrl}) => (
    <div className="wrapper-login-form">
        <h1 className="main-head">Please, log in</h1>
        <hr className="hr" />
        <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
)

export default Login;
