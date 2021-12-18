import React from 'react';

import {PostType, ProfileType} from "../../types/types";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

type PropsType = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
    posts: Array<PostType>,
}

const Profile: React.FC<PropsType> = ({isOwner, profile, status, updateStatus, savePhoto, saveProfile}) => (
    <div className="wrapper-profile">
        <ProfileInfo isOwner={isOwner} profile={profile} status={status} updateStatus={updateStatus} savePhoto={savePhoto} saveProfile={saveProfile} />
        <MyPostsContainer />
    </div>
)

export default Profile;
