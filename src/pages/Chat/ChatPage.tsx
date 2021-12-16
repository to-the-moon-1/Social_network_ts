import React, {useEffect, useRef} from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Col, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";

import "./ChatPage.css";

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

    return <div className="wrapper-messages" onScroll={scrollHandler}>
        {messages.map((m) => <Message key={m.id} message={m} />)}
        <div ref={messagesAnchorRef}/>
    </div>
}

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
    return <div className="message">
        <Row>
            <Col span={1}>
                {message.photo === null
                    ?   <Avatar className="img-message" style={{backgroundColor: '#1890ff'}} icon={<UserOutlined className="icon-message" />} />
                    :   <img className="img-message" alt={''} src={message.photo} />}

            </Col>
            <Col span={23} className="user-message">
                <b className="user-name">{message.userName}</b>
                <div className="text-message">{message.message}</div>
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
        <textarea className="textarea" onChange={(e) => setMessage(e.currentTarget.value)} value={message} placeholder={'Enter your message...'} />
        <br />
        <button className="big-btn main-btn" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
    </>
}

export default ChatPage;
