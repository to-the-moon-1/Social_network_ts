import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import Textarea from '../common/FormsControls/Textarea';
import { FieldValidatorType, required } from '../../utils/validators';
import { NewMessageFormType } from '../../containers/DialogsContainer';

type AddMessageFormType = {
  maxLength50: FieldValidatorType;
};

const AddMessageForm: React.FC<
InjectedFormProps<NewMessageFormType, AddMessageFormType> & AddMessageFormType
> = ({ handleSubmit, maxLength50 }) => (
  <form onSubmit={handleSubmit}>
    <Field
      className="textarea"
      component={Textarea}
      name="newMessageBody"
      placeholder="Enter your message"
      validate={[required, maxLength50]}
    />
    <button className="big-btn main-btn">Send message</button>
  </form>
);

const AddMessageFormRedux = reduxForm<NewMessageFormType, AddMessageFormType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm);

export default AddMessageFormRedux;
