import React from 'react';

import {PostType, ProfileType} from "../../types/types";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

import './ProfileInfo/ProfileInfo.css';
import './MyPosts/MyPosts.css';
import './MyPosts/Post/Post.css';

type PropsType = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
    posts: Array<PostType>,
}

const Profile: React.FC<PropsType> = (props) => {

    return <div className="wrapper-profile">
        <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
        <MyPostsContainer />
    </div>
}

export default Profile;
