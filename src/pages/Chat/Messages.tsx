// import React, {useEffect, useRef} from "react";
// import { useState } from "react";
// import {useDispatch, useSelector} from "react-redux";
// import {Avatar, Col, Row} from "antd";
// import {UserOutlined} from "@ant-design/icons";
//
// import {sendMessage, startMessagesListening, stopMessagesListening} from "../../redux/chat-reducer";
// import {AppStateType} from "../../redux/redux-store";
//
// import "./ChatPage.css";
//
// export type ChatMessageType = {
//     message: string,
//     photo: string,
//     userId: string,
//     userName: string,
// }
//
// const Messages: React.FC = () => {
//     const messages = useSelector((state: AppStateType) => state.chat.messages)
//     const messagesAnchorRef = useRef<HTMLDivElement>(null)
//     const [isAutoScroll, setIsAutoScroll] = useState(true)
//
//     const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
//         let element = e.currentTarget;
//         if(Math.abs((element.scrollHeight - element.scrollTop) - element.clientHeight) < 300) {
//             !isAutoScroll && setIsAutoScroll(true)
//         } else {
//             isAutoScroll && setIsAutoScroll(false)
//         }
//     }
//
//     useEffect(() => {
//         if(isAutoScroll) {
//             messagesAnchorRef.current?.scrollIntoView({behavior: 'smooth'})
//         }
//     }, [messages, isAutoScroll])
//
//     return <div className="wrapper-messages" onScroll={scrollHandler}>
//         {messages.map((m) => <Message key={m.id} message={m} />)}
//         <div ref={messagesAnchorRef}/>
//     </div>
// }
//
//
// export default Messages;
