import React, { ChangeEventHandler, MouseEventHandler } from 'react';

type AddMessageFormType = {
  message?: string | number | readonly string[];
  onChangeMessage?: ChangeEventHandler<HTMLTextAreaElement>;
  sendMessageHandler?: MouseEventHandler<HTMLButtonElement>;
  status: string;
};

const AddMessageForm: React.FC<AddMessageFormType> = ({
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
