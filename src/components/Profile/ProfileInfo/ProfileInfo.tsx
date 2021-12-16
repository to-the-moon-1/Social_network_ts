import React, {ChangeEvent, useState} from 'react';
import classes from './ProfileInfo.module.css'
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataFormReduxForm from "./ProfileDataForm";
import {ContactsType, ProfileType} from "../../../types/types";
import {Avatar, Col, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

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
                ? <img className={classes.mainImg} alt={'user'} src={profile.photos.large} />
                : <Avatar className={classes.mainImg} style={{backgroundColor: '#1890ff'}} icon={<UserOutlined className={classes.icon} />} />}
            {/*<img alt={''} className={classes.mainImg} src={profile.photos.large || userPhoto} />*/}
            {/*{isOwner && <button className={[classes.big-btn, classes.main-btn].join(' ')}>New photo<input type={'file'} className={classes.newPhotoBtn} onChange={onMainPhotoSelected} /></button>}*/}
            {isOwner && <button>New photo<input type={'file'} className={classes.newPhotoBtn} onChange={onMainPhotoSelected} /></button>}
            {/*{isOwner && !editMode && <button className={[classes.big-btn, classes.btn].join(' ')} onClick={goToEditMode}>Edit profile</button>}*/}
            {isOwner && !editMode && <button onClick={goToEditMode}>Edit profile</button>}
        </Col>
        <Col span={14} className={classes.infoContent}>
            <div className={classes.name}>{profile.fullName}</div>
            {/*<div className={classes.name}>Tony Stark</div>*/}
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
    return <div className={classes.otherInfo}>
        <div className={classes.description}><b className={classes.headDesc}>About me:</b><br /><span className={classes.contactItem}>&ndash;&nbsp; {profile.aboutMe ? profile.aboutMe : 'no information'}</span></div>
        <div className={classes.description}><b className={classes.headDesc}>Looking for a job:</b><br /><span className={classes.contactItem}>&ndash;&nbsp; {profile.lookingForAJob ? 'yes' : 'no'}</span></div>
        {profile.lookingForAJob &&
        <div className={classes.description}><b className={classes.headDesc}>My professional skills:</b><br /> {profile.lookingForAJobDescription}</div>}
        <div className={classes.contacts}><b className={classes.headDesc}>Contacts:</b> {Object.keys(profile.contacts).map((key) => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key as keyof ContactsType]} />
        })}</div>
    </div>
}

type ContactPropsType = {
    contactTitle: string,
    contactValue: string,
}

export const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <div className={classes.contactItem}>&ndash;&nbsp; {contactTitle}: {contactValue === null ? <span>no contact</span> : contactValue === '' ? <span>no contact</span> : contactValue}</div>
}

export default ProfileInfo;
