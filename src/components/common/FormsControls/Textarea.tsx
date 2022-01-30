import React from 'react';
import { WrappedFieldProps } from 'redux-form';

import { FormControl } from './FormsControl';

const Textarea: React.FC<WrappedFieldProps> = props => {
  const { input, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea className="textarea-error" {...input} {...restProps} />
    </FormControl>
  );
};

export default Textarea;
