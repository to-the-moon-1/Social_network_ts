import React, {useCallback, useEffect} from 'react';
import {compose} from "redux";
import {connect} from "react-redux";
import {RouteComponentProps, withRouter} from 'react-router-dom';

import {getStatus, getUserProfile, updateStatus, savePhoto, saveProfile} from "../../redux/profile-reducer";
import {AppStateType} from "../../redux/redux-store";
import {ProfileType} from "../../types/types";

import Profile from "./Profile";

import './ProfileInfo/ProfileInfo.css';
import './MyPosts/MyPosts.css';
import './MyPosts/Post/Post.css';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getUserProfile: (userId: number) => void,
    getStatus: (userId: number) => void,
    updateStatus: (status: string) => void,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
}
type PathParamsType = { userId: string, }
type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>

const ProfileContainer: React.FC<PropsType> = ({match, authorizedUserId, history, getUserProfile, getStatus, profile, posts, status, updateStatus, savePhoto,saveProfile}) => {
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
    }, [authorizedUserId, getStatus, getUserProfile, history, match.params.userId])

    // const refreshNullProfile = (prevProps: PropsType) => {
    //     if (match.params.userId !== prevProps.match.params.userId) {
    //         refreshProfile()
    //     }
    // }

    // useEffect(() => {
    //     refreshProfile()
    // })

    useEffect(() => {
        refreshProfile()
    }, [refreshProfile, match.params.userId])

    return (
        <Profile profile={profile}
                 posts={posts}
                 isOwner={!match.params.userId}
                 status={status}
                 updateStatus={updateStatus}
                 savePhoto={savePhoto}
                 saveProfile={saveProfile} />
    )
}

const mapStateToProps = (state: AppStateType) => {
    return ({
        posts: state.profilePage.posts,
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        authorizedUserId: state.auth.userId,
        isAuth: state.auth.isAuth,
    })
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfile}),
    withRouter
) (ProfileContainer)
