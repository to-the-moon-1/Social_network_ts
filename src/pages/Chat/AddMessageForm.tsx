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
// const AddMessageForm: React.FC = () => {
//     const [message, setMessage] = useState('')
//     const dispatch = useDispatch()
//
//     const status = useSelector((state: AppStateType) => state.chat.status)
//
//     const sendMessageHandler = () => {
//         if(!message) {
//             return
//         }
//         dispatch(sendMessage(message))
//         setMessage('')
//     }
//
//     return <>
//         <textarea className="textarea" onChange={(e) => setMessage(e.currentTarget.value)} value={message} placeholder={'Enter your message...'} />
//         <br />
//         <button className="big-btn main-btn" disabled={status !== 'ready'} onClick={sendMessageHandler}>Send</button>
//     </>
// }
//
// export default AddMessageForm;
