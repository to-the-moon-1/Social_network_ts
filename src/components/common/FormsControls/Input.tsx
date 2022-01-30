import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { FormControl } from './FormsControl';

const Input: React.FC<WrappedFieldProps> = props => {
  const { input, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input className="input-error" {...input} {...restProps} />
    </FormControl>
  );
};

export default Input;
