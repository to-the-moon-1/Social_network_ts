import React from 'react';

type PropsType = {
  message: string;
};

const Message: React.FC<PropsType> = ({ message }) => <div className="text">{message}</div>;

export default Message;
