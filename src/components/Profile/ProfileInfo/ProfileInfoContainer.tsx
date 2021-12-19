import React, { ChangeEvent, useState } from 'react';

import Preloader from '../../common/Preloader/Preloader';
import { ProfileType } from '../../../types/types';

import ProfileInfo from './ProfileInfo';

type PropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfoContainer: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);

  if (!profile) return <Preloader />;

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files.length) savePhoto(e.target.files[0]);
  };

  const onSubmit = (formData: ProfileType): void => {
    try {
      saveProfile(formData).then(() => {
        setEditMode(false);
      });
    } catch (err) {
      throw new Error(err as string);
    }
  };

  const goToEditMode = (): void => setEditMode(true);

  return (
    <ProfileInfo
      editMode={editMode}
      goToEditMode={goToEditMode}
      isOwner={isOwner}
      onMainPhotoSelected={onMainPhotoSelected}
      onSubmit={onSubmit}
      profile={profile}
      status={status}
      updateStatus={updateStatus}
    />
  );
};

export default ProfileInfoContainer;
