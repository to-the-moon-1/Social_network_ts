import React from 'react';
import { Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { ChatMessageType } from './ChatContainer';

const Message: React.FC<{ message: ChatMessageType }> = React.memo(({ message }) => (
  <div className="message">
    <Row>
      <Col span={1}>
        {message.photo === null ? (
          <Avatar
            className="img-message"
            icon={<UserOutlined className="icon icon-message" />}
            style={{ backgroundColor: '#1890ff' }}
          />
        ) : (
          <img alt="" className="img-message" src={message.photo} />
        )}
      </Col>
      <Col className="user-message" span={23}>
        <b className="user-name">{message.userName}</b>
        <div className="text-message">{message.message}</div>
      </Col>
    </Row>
  </div>
));

Message.displayName = 'Message';

export default Message;
