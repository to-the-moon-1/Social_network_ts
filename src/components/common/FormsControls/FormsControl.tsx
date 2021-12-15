import React from "react";
import classes from './FormsControl.module.css'
import {WrappedFieldMetaProps, WrappedFieldProps} from "redux-form";

type FormControlPropsType = {
    meta: WrappedFieldMetaProps,
}

export const FormControl: React.FC<FormControlPropsType> = ({meta: {touched, error}, children}) => {

    const hasError = touched && error;

    return (<div className={classes.formControl + ' ' + (hasError ? classes.error : '')}>
            <div>
                {children}
            </div>
            {hasError && <span>{error}</span>}
        </div>)
}



export const Textarea: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><textarea {...input} {...restProps} /></FormControl>
}

export const Input: React.FC<WrappedFieldProps> = (props) => {
    // const {input, meta, child, ...restProps} = props;
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}><input {...input} {...restProps} /></FormControl>
}