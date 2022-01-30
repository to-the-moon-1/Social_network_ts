import React from 'react';
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'antd';

type DialogItemType = {
  id: number;
  name: string;
  src: string;
  messageText: string;
};

const DialogItem: React.FC<DialogItemType> = ({ id, src, name, messageText }) => {
  const path = `/dialogs/${id}`;

  return (
    <div className="dialog">
      <Row>
        <Col span={4}>
          <img alt="userImage" className="img-dialog" src={src} />
        </Col>
        <Col className="wrapper-dialog" span={20}>
          <NavLink activeClassName="active active-dialog" className="dialog-user-name" to={path}>
            {name}
          </NavLink>
          <div className="text-dialog">{messageText}</div>
        </Col>
      </Row>
    </div>
  );
};

export default DialogItem;
