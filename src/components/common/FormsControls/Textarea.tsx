import React from "react";
import {WrappedFieldProps} from "redux-form";

import {FormControl} from "./FormsControl";

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea className="textarea-error" {...input} {...restProps} /></FormControl>
}
