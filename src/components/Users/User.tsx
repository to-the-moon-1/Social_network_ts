import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { UserType } from '../../types/types';

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const User: React.FC<PropsType> = ({ user, followingInProgress, unfollow, follow }) => (
  <Row key={user.id} className="wrapper-user">
    <Col span={2}>
      <NavLink to={`/profile/${user.id}`}>
        {user.photos.small != null ? (
          <img alt="user" className="img-user" src={user.photos.small} />
        ) : (
          <Avatar className="avatar-user" icon={<UserOutlined className="icon icon-user" />} />
        )}
      </NavLink>
    </Col>
    <Col className="info-user" span={18}>
      <span>
        <div className="name-user">{user.name}</div>
      </span>
      <span>
        <div className="location-user">location.country</div>
        <div className="location-user">location.city</div>
      </span>
    </Col>
    <Col span={4}>
      {user.followed ? (
        <button
          className="middle-btn action-btn"
          disabled={followingInProgress.some(id => id === user.id)}
          onClick={() => {
            unfollow(user.id);
          }}
        >
          Unfollow
        </button>
      ) : (
        <button
          className="middle-btn action-btn"
          disabled={followingInProgress.some(id => id === user.id)}
          onClick={() => {
            follow(user.id);
          }}
        >
          Follow
        </button>
      )}
    </Col>
  </Row>
);

export default User;
