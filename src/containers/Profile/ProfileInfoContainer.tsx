import React, { ChangeEvent, useEffect, useState } from 'react';

import Preloader from '../../components/common/Preloader/Preloader';
import { ProfileType } from '../../types/types';

import ProfileInfo from '../../components/Profile/ProfileInfo/ProfileInfo';

type ProfileInfoContainerType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
};

const ProfileInfoContainer: React.FC<ProfileInfoContainerType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [editModeStatus, setEditModeStatus] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  useEffect(() => {
    setNewStatus(status);
  }, [status]);

  const activateEditModeStatus = (): void => {
    setEditModeStatus(true);
  };

  const deactivateEditModeStatus = (): void => {
    setEditModeStatus(false);
    updateStatus(newStatus);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewStatus(e.currentTarget.value);
  };

  const onMainPhotoSelected = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files && e.target.files?.length) savePhoto(e.target.files[0]);
  };

  const onSubmit = (formData: ProfileType): void => {
    try {
      saveProfile(formData).then(() => {
        setEditMode(false);
      });
    } catch {
      throw new Error('Something was wrong!');
    }
  };

  const goToEditMode = (): void => setEditMode(true);

  if (!profile) return <Preloader />;

  return (
    <ProfileInfo
      activateEditModeStatus={activateEditModeStatus}
      deactivateEditModeStatus={deactivateEditModeStatus}
      editMode={editMode}
      editModeStatus={editModeStatus}
      goToEditMode={goToEditMode}
      isOwner={isOwner}
      newStatus={newStatus}
      onMainPhotoSelected={onMainPhotoSelected}
      onStatusChange={onStatusChange}
      onSubmit={onSubmit}
      profile={profile}
      status={status}
      updateStatus={updateStatus}
    />
  );
};

export default ProfileInfoContainer;
