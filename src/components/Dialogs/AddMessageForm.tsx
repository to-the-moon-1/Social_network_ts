import React from 'react';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';

import { NewMessageFormType } from './DialogsContainer';
import Textarea from '../common/FormsControls/Textarea';
import { FieldValidatorType, required } from '../../utils/validators/validators';

type PropsType = {
  maxLength50: FieldValidatorType;
};

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, PropsType> & PropsType> = ({
  handleSubmit,
  maxLength50,
}) => (
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

const AddMessageFormRedux = reduxForm<NewMessageFormType, PropsType>({
  form: 'dialogAddMessageForm',
})(AddMessageForm);

export default AddMessageFormRedux;
