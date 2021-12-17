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
// const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => {
//     return <div className="message">
//         <Row>
//             <Col span={1}>
//                 {message.photo === null
//                     ?   <Avatar className="img-message" style={{backgroundColor: '#1890ff'}} icon={<UserOutlined className="icon icon-message" />} />
//                     :   <img className="img-message" alt={''} src={message.photo} />}
//
//             </Col>
//             <Col span={23} className="user-message">
//                 <b className="user-name">{message.userName}</b>
//                 <div className="text-message">{message.message}</div>
//             </Col>
//         </Row>
//     </div>
// })
//
// export default Message;
