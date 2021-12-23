import React, { RefObject } from 'react';

import { ChatMessageType } from '../../containers/ChatContainer';
import Message from './Message';

type MessagesType = {
  messages: ChatMessageType[];
  scrollHandler: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
  messagesAnchorRef: RefObject<HTMLDivElement>;
};

const Messages: React.FC<MessagesType> = ({ scrollHandler, messages, messagesAnchorRef }) => (
  <div className="wrapper-messages" onScroll={scrollHandler}>
    {messages.map(message => (
      <Message key={message.userId} message={message} />
    ))}
    <div ref={messagesAnchorRef} />
  </div>
);

export default Messages;
