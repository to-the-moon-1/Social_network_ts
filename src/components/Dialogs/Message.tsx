import React from 'react';

type MessageType = {
  message: string;
};

const Message: React.FC<MessageType> = ({ message }) => <div className="text">{message}</div>;

export default Message;
