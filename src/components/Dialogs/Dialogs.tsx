import React from 'react';
import classes from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControl";
import {maxLengthCreator, required} from "../../utils/validators/validators";
import {InitialStateType} from "../../redux/dialogs-reducer";
import {Col, Row} from "antd";

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

    let dialogsElements = state.dialogs.map(dialog => <DialogItem name={dialog.name} key={dialog.id} id={dialog.id}
                                                                        src={dialog.src} messageText={dialog.messageText}/>);

    let messagesElements = state.messages.map((message, index) => <Message key={index} message={message.message}/>)

    // let newMessageBody = state.newMessageBody;

    // if (!props.isAuth) return <Redirect to={'/login'} />

    return <Row className={classes.dialogs}>
        <Col span={10} className={classes.dialogsItems}>
            {dialogsElements}
        </Col>
        <Col span={14} className={classes.mainContent}>
            <div>{messagesElements}</div>
            <AddMessageFormRedux onSubmit={addNewMessage} />
        </Col>
    </Row>
}

const maxLength50 = maxLengthCreator(50);

type FormType = {}

const AddMessageForm: React.FC<InjectedFormProps<NewMessageFormType, FormType> & FormType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field className={classes.textarea} component={Textarea} name={'newMessageBody'} placeholder={'Enter your message'} validate={[required, maxLength50]} />
            <button className={[classes.setBtn, classes.mainBtn].join(' ')}>Send message</button>
        </form>
    )
}

const AddMessageFormRedux = reduxForm<NewMessageFormType>({form: 'dialogAddMessageForm'}) (AddMessageForm);

export default Dialogs;




