import React, { ChangeEvent } from 'react';
import { Avatar, Col, Row } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { ProfileType } from '../../../types/types';

import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileDataFormReduxForm from './ProfileDataForm';
import ProfileData from './ProfileData';

type PropsType = {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  editMode: boolean;
  onMainPhotoSelected: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (formData: ProfileType) => void;
  goToEditMode: () => void;
};

const ProfileInfo: React.FC<PropsType> = ({
  profile,
  status,
  updateStatus,
  isOwner,
  editMode,
  onMainPhotoSelected,
  onSubmit,
  goToEditMode,
}) => (
  <Row>
    <Col span={10}>
      {profile.photos.large != null ? (
        <img alt="user" className="img-profile" src={profile.photos.large} />
      ) : (
        <Avatar className="img-profile" icon={<UserOutlined className="icon icon-profile" />} />
      )}
      {isOwner && (
        <button className="big-btn main-btn">
          New photo
          <input className="set-photo-btn" onChange={onMainPhotoSelected} type="file" />
        </button>
      )}
      {isOwner && !editMode && (
        <button className="big-btn btn" onClick={goToEditMode}>
          Edit profile
        </button>
      )}
    </Col>
    <Col className="wrapper-profile-info" span={14}>
      <div className="name-profile">{profile.fullName}</div>
      <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      <hr style={{ opacity: 0.5 }} />
      {editMode ? (
        <ProfileDataFormReduxForm initialValues={profile} onSubmit={onSubmit} profile={profile} />
      ) : (
        <ProfileData profile={profile} />
      )}
    </Col>
  </Row>
);

export default ProfileInfo;
