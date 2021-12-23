import React from 'react';
import { Col, Row } from 'antd';

import { DialogType, MessageType } from '../../redux/dialogs-reducer';
import { FieldValidatorType } from '../../utils/validators';

import AddMessageFormRedux from './AddMessageForm';
import { NewMessageFormType } from '../../containers/DialogsContainer';
import DialogItem from './DialogItem';
import Message from './Message';

type DialogsType = {
  state: { dialogs: DialogType[]; messages: MessageType[] };
  maxLength50: FieldValidatorType;
  onSubmit: (values: NewMessageFormType) => void;
};

const Dialogs: React.FC<DialogsType> = ({ onSubmit, maxLength50, state }) => (
  <Row>
    <Col span={10}>
      {state.dialogs.map(({ name, src, id, messageText }) => (
        <DialogItem key={id} id={id} messageText={messageText} name={name} src={src} />
      ))}
    </Col>
    <Col className="wrapper-dialogs" span={14}>
      <div>
        {state.messages.map(({ message, id }) => (
          <Message key={id} message={message} />
        ))}
      </div>
      <AddMessageFormRedux maxLength50={maxLength50} onSubmit={onSubmit} />
    </Col>
  </Row>
);

export default Dialogs;
