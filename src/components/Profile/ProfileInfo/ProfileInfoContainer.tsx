import React, {ChangeEvent, useState} from 'react';

import Preloader from "../../common/Preloader/Preloader";
import {ProfileType} from "../../../types/types";

import ProfileInfo from "./ProfileInfo";

type PropsType = {
    profile: ProfileType,
    status: string,
    updateStatus: (status: string) => void,
    isOwner: boolean,
    savePhoto: (file: File) => void,
    saveProfile: (profile: ProfileType) => Promise<any>,
}

const ProfileInfoContainer: React.FC<PropsType> = ({profile, status, updateStatus, isOwner, savePhoto, saveProfile}) => {

    let [editMode, setEditMode] = useState(false);

    if (!profile) return <Preloader />

    const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) savePhoto(e.target.files[0])
    }

    const onSubmit = (formData: ProfileType) => {
        try {
            saveProfile(formData).then(() => {
                setEditMode(false);
            })
        } catch (err) {
            return err
        }
    }

    const goToEditMode = () => setEditMode(true)

    return <ProfileInfo profile={profile} status={status} updateStatus={updateStatus} isOwner={isOwner} editMode={editMode} onMainPhotoSelected={onMainPhotoSelected} onSubmit={onSubmit} goToEditMode={goToEditMode} />
}

export default ProfileInfoContainer;
