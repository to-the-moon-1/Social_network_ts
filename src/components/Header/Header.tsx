import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Col, Menu, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';

type MapPropsType = {
  isAuth: boolean;
  loginCallback: string | null;
};

type DispatchPropsType = {
  logoutCallback: () => void;
};

const AppHeader: React.FC<MapPropsType & DispatchPropsType> = ({
  isAuth,
  loginCallback,
  logoutCallback,
}) => (
  <Header className="header">
    <div className="logo" />
    <Row className="wrapper-header">
      <Col span={18}>
        <Menu defaultSelectedKeys={['2']} mode="horizontal" theme="dark">
          <img
            alt=""
            className="img-header"
            src="https://www.smeg.com/binaries/content/gallery/logo/logo_bianco_no-back.png"
          />
        </Menu>
      </Col>
      <Col span={6}>
        <div className="wrapper-login">
          {isAuth ? (
            <div className="item-login">
              {' '}
              <Avatar className="avatar" icon={<UserOutlined />} />
              {loginCallback}&nbsp;&nbsp;&nbsp; <span>|</span>&nbsp;&nbsp;&nbsp;
              <button className="logout-btn" onClick={logoutCallback}>
                Log out
              </button>
            </div>
          ) : (
            <Link className="item-login" to="/login">
              Login
            </Link>
          )}
        </div>
      </Col>
    </Row>
  </Header>
);

export default AppHeader;
