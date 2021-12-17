import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Col, Row} from "antd";

import {InitialStateType} from "../../redux/dialogs-reducer";
import {Textarea} from "../common/FormsControls/Textarea";
import {maxLengthCreator, required} from "../../utils/validators/validators";

import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";

import './Dialogs.css';

type PropsType = {
    dialogsPage: InitialStateType,
    sendMessage: (messageText: string) => void,
}

type NewMessageFormType = {
    newMessageBody: string,
}

const Dialogs: React.FC<PropsType> = (props) => {

    let state = props.dialogsPage;

    let addNewMessage = (values: NewMessageFormType) => {
        props.sendMessage(values.newMessageBody);
    }

    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.src} id={dialog.id}
                                                                        src={dialog.src} messageText={dialog.messageText}/>);

    let messagesElements = state.messages.map((message, index) => <Message key={index} message={message.message}/>)

    return <Row>
        <Col span={10}>
            {dialogsElements}
        </Col>
        <Col span={14} className="wrapper-dialogs">
            <div>{messagesElements}</div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </Col>
    </Row>
}

const maxLength50 = maxLengthCreator(50);

type FormType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, FormType> & FormType> = (props) => (
        <form onSubmit={props.handleSubmit}>
            <Field className="textarea" component={Textarea} name={'newMessageBody'} placeholder={'Enter your message'} validate={[required, maxLength50]} />
            <button className="big-btn main-btn">Send message</button>
        </form>
    )

const AddMessageFormRedux = reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'}) (AddMessageForm);

export default Dialogs;




