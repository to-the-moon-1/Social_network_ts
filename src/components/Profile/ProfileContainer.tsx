import React, { useCallback, useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import {
  getStatus,
  getUserProfile,
  updateStatus,
  savePhoto,
  saveProfile,
} from '../../redux/profile-reducer';
import { AppStateType } from '../../redux/redux-store';
import { PostType, ProfileType } from '../../types/types';

import Profile from './Profile';

import './ProfileInfo/ProfileInfo.css';
import './MyPosts/MyPosts.css';
import './MyPosts/Post/Post.css';

const mapStateToProps = (
  state: AppStateType,
): {
  posts: PostType[];
  profile: ProfileType;
  status: string;
  authorizedUserId: number;
  isAuth: boolean;
} => {
  const { posts, profile, status, userId } = state.profilePage;
  const { isAuth } = state.auth;
  return {
    posts,
    profile,
    status,
    authorizedUserId: userId,
    isAuth,
  };
};

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};
type PathParamsType = { userId: string };
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

const ProfileContainer: React.FC<PropsType> = ({
  match,
  authorizedUserId,
  history,
  profile,
  posts,
  status,
}) => {
  const refreshProfile = useCallback(() => {
    let userId: number | null = +match.params.userId;
    if (!userId) {
      userId = authorizedUserId;
      if (!userId) {
        history.push('/login');
      }
    } else {
      getUserProfile(userId);
      getStatus(userId);
    }
  }, [authorizedUserId, history, match.params.userId]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile, match.params.userId]);

  return (
    <Profile
      isOwner={!match.params.userId}
      posts={posts}
      profile={profile}
      savePhoto={savePhoto}
      saveProfile={saveProfile}
      status={status}
      updateStatus={updateStatus}
    />
  );
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
)(ProfileContainer);
