import React, {RefObject} from "react";

import {ChatMessageType} from "./ChatContainer";
import Message from "./Message";

type PropsType = {
    messages: ChatMessageType[],
    scrollHandler: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void,
    messagesAnchorRef: RefObject<HTMLDivElement>,
}

const Messages: React.FC<PropsType> = ({scrollHandler, messages, messagesAnchorRef}) => (
    <div className="wrapper-messages" onScroll={scrollHandler}>
        {messages.map((message) => <Message key={message.userId} message={message} />)}
        <div ref={messagesAnchorRef}/>
    </div>
)


export default Messages;
