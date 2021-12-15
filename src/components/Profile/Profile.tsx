import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import classes from './../Profile/ProfileInfo/ProfileInfo.module.css';
import {PostType, ProfileType} from "../../types/types";

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

    return <div className={classes.mainContent}>
        <ProfileInfo isOwner={props.isOwner} profile={props.profile} status={props.status} updateStatus={props.updateStatus} savePhoto={props.savePhoto} saveProfile={props.saveProfile} />
        <MyPostsContainer />
    </div>
}

export default Profile;