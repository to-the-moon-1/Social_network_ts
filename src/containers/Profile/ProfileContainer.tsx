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

import Profile from '../../components/Profile/Profile';

import '../../styles/Profile/ProfileInfo.css';
import '../../styles/Profile/MyPosts.css';

type MapPropsType = {
  posts: PostType[];
  profile: ProfileType;
  status: string;
  authorizedUserId: number;
  isAuth: boolean;
};

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
  match: {
    params: { userId },
  },
  authorizedUserId,
  history,
  profile,
  posts,
  status,
}) => {
  const refreshProfile = useCallback(() => {
    let actualUserId: number | null = +userId;
    if (!actualUserId) {
      actualUserId = authorizedUserId;
      if (!actualUserId) {
        history.push('/login');
      }
    } else {
      getUserProfile(actualUserId);
      getStatus(actualUserId);
    }
  }, [authorizedUserId, history, userId]);

  useEffect(() => {
    refreshProfile();
  }, [refreshProfile, userId]);

  return (
    <Profile
      isOwner={!userId}
      posts={posts}
      profile={profile}
      savePhoto={savePhoto}
      saveProfile={saveProfile}
      status={status}
      updateStatus={updateStatus}
    />
  );
};

ProfileContainer.defaultProps = {
  posts: [],
  profile: {
    userId: 0,
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: '',
    contacts: {
      github: '',
      vk: '',
      facebook: '',
      instagram: '',
      twitter: '',
      website: '',
      youtube: '',
      mainLink: '',
    },
    photos: { small: '', large: '' },
    aboutMe: '',
  },
  status: '',
  authorizedUserId: 0,
  isAuth: false,
};

const mapStateToProps = (state: AppStateType): MapPropsType => {
  const { posts, profile, status, userId } = state.profileReducer;
  const { isAuth } = state.authReducer;
  return {
    posts,
    profile,
    status,
    authorizedUserId: userId,
    isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile }),
  withRouter,
)(ProfileContainer);
