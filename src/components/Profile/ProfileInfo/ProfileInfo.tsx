import React, {ChangeEvent, useState} from 'react';
import {Avatar, Col, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

import Preloader from "../../common/Preloader/Preloader";
import {ContactsType, ProfileType} from "../../../types/types";

import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";

type PropsType = {
    profile: ProfileType | null,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
}

const ProfileInfo: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) {
        return <Preloader />
    }

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            savePhoto(e.target.files[0])
        }
    }

    const onSubmit = (formData: ProfileType) => {
        try {
            saveProfile(formData).then(() => {
                setEditMode(false);
            })
        } catch (err) {
            console.log(err);
        }
        console.log(formData)
    }

    const goToEditMode = () => {
        setEditMode(true)}

    return <Row>
        <Col span={10}>
            {profile.photos.large != null
                ? <img className="img-profile" alt={'user'} src={profile.photos.large} />
                : <Avatar className="img-profile" icon={<UserOutlined className="icon icon-profile" />} />}
            {isOwner && <button className="big-btn main-btn">New photo<input type={'file'} className="set-photo-btn" onChange={onMainPhotoSelected} /></button>}
            {isOwner && !editMode && <button className="big-btn btn" onClick={goToEditMode}>Edit profile</button>}
        </Col>
        <Col span={14} className="wrapper-profile-info">
            <div className="name-profile">{profile.fullName}</div>
            <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
            <hr style={{opacity: .5}} />
            {editMode
                ? <ProfileDataFormReduxForm initialValues={profile} profile={profile} onSubmit={onSubmit} />
                : <ProfileData profile={profile} isOwner={isOwner} goToEditMode={goToEditMode} />}
        </Col>
    </Row>
}

type ProfileDataPropsType = {
    profile: ProfileType,
    isOwner: boolean,
    goToEditMode: () => void,
}

const ProfileData: React.FC<ProfileDataPropsType> = ({profile, }) => {
    return <div className="wrapper-profile-form">
        <div className="wrapper-field"><b>About me:</b><br /><span className="item-field">&ndash;&nbsp; {profile.aboutMe ? profile.aboutMe : 'no information'}</span></div>
        <div className="wrapper-field"><b>Looking for a job:</b><br /><span className="item-field">&ndash;&nbsp; {profile.lookingForAJob ? 'yes' : 'no'}</span></div>
        {profile.lookingForAJob &&
        <div className="wrapper-field"><b>My professional skills:</b><br /><span className="item-field">&ndash;&nbsp; {profile.lookingForAJobDescription}</span></div>}
        <div className="wrapper-field"><b>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
        })}</div>
    </div>
}

type ContactPropsType = {
    contactTitle: string,
    contactValue: string,
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className="item-field">&ndash;&nbsp; {contactTitle}: {contactValue === null ? <span>no contact</span> : contactValue === '' ? <span>no contact</span> : contactValue}</div>
}

export default ProfileInfo;
