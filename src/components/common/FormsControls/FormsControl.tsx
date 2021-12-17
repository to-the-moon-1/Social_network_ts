import React from "react";
import {WrappedFieldMetaProps} from "redux-form";

import './FormsControl.css';

export type FormControlPropsType = {
    meta: WrappedFieldMetaProps,
}

export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {
    const hasError = touched && error;

    return (
        <div className={hasError ? "form-control error" : "form-control"}>
            <div>{children}</div>
            {hasError && <span className="text-error">{error}</span>}
        </div>
    )
}
