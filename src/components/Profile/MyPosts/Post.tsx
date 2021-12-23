import React from 'react';
import { Col, Row } from 'antd';

import { ProfileType } from '../../../types/types';
import mainImg from '../../../assets/images/post/Tony.jpg';

type PostType = {
  message: string;
  likesCount: number;
  reposts: number;
  profile: ProfileType;
};

const Post: React.FC<PostType> = ({ message, reposts, likesCount }) => (
  <div className="item-post">
    <Row>
      <Col span={4}>
        <img alt="" className="img-user-post" src={mainImg} />
      </Col>
      <Col className="wrapper-post" span={20}>
        <span className="name-user-post">Header of post</span>
        <br />
        <div className="wrapper-text-post">
          <span>{message}</span>
        </div>
      </Col>
    </Row>
    <Row>
      <Col span={13}>&nbsp;</Col>
      <Col className="activity-post" span={11}>
        <span className="repost">
          Repost <span className="count">{reposts}</span>
        </span>
        <span className="like">
          Like <span className="count">{likesCount}</span>
        </span>
      </Col>
    </Row>
  </div>
);

export default Post;