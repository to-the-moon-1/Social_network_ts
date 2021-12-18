import React from 'react';
import {Col, Row} from "antd";

import {DialogType, MessageType} from "../../redux/dialogs-reducer";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import AddMessageFormRedux from "./AddMessageForm";
import {FieldValidatorType} from "../../utils/validators/validators";
import {NewMessageFormType} from "./DialogsContainer";

type PropsType = {
    state: {dialogs: DialogType[], messages: MessageType[]},
    maxLength50: FieldValidatorType,
    onSubmit: (values: NewMessageFormType) => void,
}

const Dialogs: React.FC<PropsType> = ({onSubmit, maxLength50, state}) => (
    <Row>
        <Col span={10}>
            {state.dialogs.map(({name, src, id, messageText}) => <DialogItem name={name} key={id} id={id}
                                                     src={src} messageText={messageText}/>)}
        </Col>
        <Col span={14} className="wrapper-dialogs">
            <div>{state.messages.map(({message, id}) => <Message key={id} message={message}/>)}</div>
            <AddMessageFormRedux maxLength50={maxLength50} onSubmit={onSubmit} />
        </Col>
    </Row>
)

export default Dialogs;
