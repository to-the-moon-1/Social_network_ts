import React from "react";
import {WrappedFieldProps} from "redux-form";

import {FormControl} from "./FormsControl";

export const Input: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input className="input-error" {...input} {...restProps} /></FormControl>
}
