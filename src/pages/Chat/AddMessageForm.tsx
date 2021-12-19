import React, { ChangeEventHandler, MouseEventHandler } from 'react';

type PropsType = {
  message: string | number | readonly string[] | undefined;
  onChangeMessage: ChangeEventHandler<HTMLTextAreaElement> | undefined;
  sendMessageHandler: MouseEventHandler<HTMLButtonElement> | undefined;
  status: string;
};

const AddMessageForm: React.FC<PropsType> = ({
  message,
  onChangeMessage,
  sendMessageHandler,
  status,
}) => (
  <>
    <textarea
      className="textarea"
      onChange={onChangeMessage}
      placeholder="Enter your message..."
      value={message}
    />
    <br />
    <button className="big-btn main-btn" disabled={status !== 'ready'} onClick={sendMessageHandler}>
      Send
    </button>
  </>
);

export default AddMessageForm;
