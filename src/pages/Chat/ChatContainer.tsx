import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  sendMessage,
  startMessagesListening,
  stopMessagesListening,
} from '../../redux/chat-reducer';
import Messages from './Messages';
import AddMessageForm from './AddMessageForm';

import './ChatPage.css';

export type ChatMessageType = {
  message: string;
  photo: string;
  userId: string;
  userName: string;
};

const ChatContainer: React.FC = () => {
  const messages = useSelector(
    (state: { chat: { messages: ChatMessageType[] } }): ChatMessageType[] => state.chat.messages,
  );
  const messagesAnchorRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [message, setMessage] = useState('');

  const status = useSelector((state: { chat: { status: string } }) => state.chat.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAutoScroll) messagesAnchorRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAutoScroll]);

  useEffect(() => {
    dispatch(startMessagesListening());
    return () => {
      dispatch(stopMessagesListening());
    };
  }, [dispatch]);

  const onChangeMessage = (e: React.ChangeEvent<HTMLTextAreaElement>): void =>
    setMessage(e.currentTarget.value);

  const sendMessageHandler = (): void => {
    if (!message) {
      return;
    }
    dispatch(sendMessage(message));
    setMessage('');
  };

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>): boolean | void => {
    const element = e.currentTarget;
    if (Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 300) {
      return !isAutoScroll && setIsAutoScroll(true);
    }
    return isAutoScroll && setIsAutoScroll(false);
  };

  return (
    <>
      {status === 'error' && (
        <div>
          Some error occured
          <br />
          Please, refresh the page
        </div>
      )}
      <>
        <Messages
          messages={messages}
          messagesAnchorRef={messagesAnchorRef}
          scrollHandler={scrollHandler}
        />
        <AddMessageForm
          message={message}
          onChangeMessage={onChangeMessage}
          sendMessageHandler={sendMessageHandler}
          status={status}
        />
      </>
    </>
  );
};

export default ChatContainer;
