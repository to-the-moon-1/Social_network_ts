import React, {useEffect, useRef} from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import classes from "./ChatPage.module.css";
import {Avatar, Col, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: string,
    userName: string,
}

const ChatPage: React.FC = () => {
    return <Chat />
}

const Chat: React.FC = () => {
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    return <>
    {status === 'error' && <div>Some error occured<br />Please, refresh the page</div>}
        <>
            <Messages />
            <AddMessageForm />
        </>
    </>
}

const Messages: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    useEffect(() => {
        if(isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [messages, isAutoScroll])

    return <div className={classes.allMessages} style={{height: '570px', overflowY: 'auto'}} onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}/>
    </div>
}

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return <div className={classes.message}>
        <Row>
            <Col span={1}>
                {message.photo === null
                    ?   <Avatar className={classes.chatImg} style={{backgroundColor: '#1890ff'}} icon={<UserOutlined className={classes.icon} />} />
                    :   <img className={classes.chatImg} alt={''} src={message.photo} />}

            </Col>
            <Col span={23} className={classes.userContent}>
                <b className={classes.userName}>{message.userName}</b>
                <div className={classes.messageText}>{message.message}</div>
            </Col>
        </Row>
    </div>
})

const AddMessageForm: React.FC = () => {
    const [message, setMessage] = useState('')
    const dispatch = useDispatch()

    const status = useSelector((state: AppStateType) => state.chat.status)

    const sendMessageHandler = () => {
        if(!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    return <>
        <textarea className={classes.textarea} onChange={(e) => setMessage(e.currentTarget.value)} value={message} placeholder={'Enter your message...'} />
        <br />
        <button className={[classes.setBtn, classes.mainBtn].join(' ')} disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    </>
}

export default ChatPage;
