import React, {useEffect, useRef} from "react";
import { useState } from "react";
import {useDispatch, useSelector} from "react-redux";

import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
import {AppStateType} from "../../redux/redux-store";
import Messages from "./Messages";
import AddMessageForm from "./AddMessageForm";

import "./ChatPage.css";

export type ChatMessageType = {
    message: string,
    photo: string,
    userId: string,
    userName: string,
}

const ChatContainer: React.FC = () => {
    const messages = useSelector((state: AppStateType) => state.chat.messages)
    const messagesAnchorRef = useRef<HTMLDivElement>(null)
    const [isAutoScroll, setIsAutoScroll] = useState(true)
    const [message, setMessage] = useState('')

    const status = useSelector((state: AppStateType) => state.chat.status)

    const dispatch = useDispatch()

    useEffect(() => {
        if(isAutoScroll) messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messages, isAutoScroll])

    useEffect(() => {
        dispatch(startMessagesListening())
        return () => {
            dispatch(stopMessagesListening())
        }
    }, [dispatch])

    const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.currentTarget.value)

    const sendMessageHandler = () => {
        if(!message) {
            return
        }
        dispatch(sendMessage(message))
        setMessage('')
    }

    const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        let element = e.currentTarget;
        if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    }

    return <>
        {status === 'error' && <div>Some error occured<br />Please, refresh the page</div>}
        <>
            <Messages scrollHandler={scrollHandler} messages={messages} messagesAnchorRef={messagesAnchorRef} />
            <AddMessageForm message={message} onChangeMessage={onChangeMessage} sendMessageHandler={sendMessageHandler} status={status} />
        </>
    </>
}

export default ChatContainer;
