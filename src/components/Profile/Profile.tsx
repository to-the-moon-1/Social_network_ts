import React from 'react';

import { PostType, ProfileType } from '../../types/types';

import PostsContainer from './MyPosts/MyPostsContainer';
import ProfileInfoContainer from './ProfileInfo/ProfileInfoContainer';

type PropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
  posts: Array<PostType>;
};

const Profile: React.FC<PropsType> = ({
  isOwner,
  profile,
  status,
  updateStatus,
  savePhoto,
  saveProfile,
}) => (
  <div className="wrapper-profile">
    <ProfileInfoContainer
      isOwner={isOwner}
      profile={profile}
      savePhoto={savePhoto}
      saveProfile={saveProfile}
      status={status}
      updateStatus={updateStatus}
    />
    <PostsContainer />
  </div>
);

export default Profile;
