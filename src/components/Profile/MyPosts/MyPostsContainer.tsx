import React from 'react';
import { connect } from 'react-redux';

import { actions } from '../../../redux/profile-reducer';
import { AppStateType } from '../../../redux/redux-store';
import { maxLengthCreator } from '../../../utils/validators/validators';
import { PostType, ProfileType } from '../../../types/types';

import MyPosts from './MyPosts';

export type MapPropsType = {
  posts: Array<PostType>;
  isOwner: boolean;
  profile: ProfileType;
};

export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};

export type AddPostFormValuesType = {
  newPostText: string;
};

const MyPostsContainer: React.FC<MapPropsType & DispatchPropsType> = ({
  posts,
  addPost,
  isOwner,
  profile,
}) => {
  const maxLength100 = maxLengthCreator(100);

  const onAddPost = (values: AddPostFormValuesType): void => addPost(values.newPostText);

  return (
    <MyPosts
      isOwner={isOwner}
      maxLength100={maxLength100}
      onAddPost={onAddPost}
      posts={posts}
      profile={profile}
    />
  );
};

const mapStateToProps = (state: { profilePage: { posts: Array<PostType> } }): MapPropsType => {
  return {
    posts: state.profilePage.posts,
  } as MapPropsType;
};

const PostsContainer = connect<MapPropsType, DispatchPropsType, Record<string, unknown>, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator,
})(MyPostsContainer);

export default PostsContainer;
