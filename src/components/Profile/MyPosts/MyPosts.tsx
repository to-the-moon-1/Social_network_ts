import React from 'react';
import { Col, Row } from 'antd';

import { FieldValidatorType } from '../../../utils/validators';
import { PostType, ProfileType } from '../../../types/types';

import Post from './Post';
import AddNewPostFormRedux from './AddNewPostForm';
import { AddPostFormValuesType } from '../../../containers/Profile/MyPostsContainer';

type PropsType = {
  posts: Array<PostType>;
  maxLength100: FieldValidatorType;
  onAddPost: (values: AddPostFormValuesType) => void;
  isOwner: boolean;
  profile: ProfileType;
};

const MyPosts: React.FC<PropsType> = ({ posts, maxLength100, onAddPost, isOwner, profile }) => {
  const reversedPosts = [...posts].reverse();

  return (
    <div className="wrapper-posts">
      <Row>
        <Col span={10}>&nbsp;</Col>
        <Col span={14}>
          <hr className="hr-posts" />
          <h2 className="head-posts">My posts</h2>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <div>
            {reversedPosts.map(({ message, reposts, likesCount }) => (
              <Post
                key={message}
                likesCount={likesCount}
                message={message}
                profile={profile}
                reposts={reposts}
              />
            ))}
          </div>
        </Col>
        <Col span={14}>
          {!isOwner && <AddNewPostFormRedux maxLength100={maxLength100} onSubmit={onAddPost} />}
        </Col>
      </Row>
    </div>
  );
};

export default MyPosts;
