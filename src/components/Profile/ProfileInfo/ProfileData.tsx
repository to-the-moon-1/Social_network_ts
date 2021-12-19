import React from 'react';

import { ContactsType, ProfileType } from '../../../types/types';

import Contacts from './ProfileContact';

type ProfileDataPropsType = {
  profile: ProfileType;
};

const ProfileData: React.FC<ProfileDataPropsType> = ({
  profile: { aboutMe, lookingForAJob, lookingForAJobDescription, contacts },
}) => (
  <div className="wrapper-profile-form">
    <div className="wrapper-field">
      <b>About me:</b>
      <br />
      <span className="item-field">&ndash;&nbsp; {aboutMe || 'no information'}</span>
    </div>
    <div className="wrapper-field">
      <b>Looking for a job:</b>
      <br />
      <span className="item-field">&ndash;&nbsp; {lookingForAJob ? 'yes' : 'no'}</span>
    </div>
    {lookingForAJob && (
      <div className="wrapper-field">
        <b>My professional skills:</b>
        <br />
        <span className="item-field">&ndash;&nbsp; {lookingForAJobDescription}</span>
      </div>
    )}
    <div className="wrapper-field">
      <b>Contacts:</b>{' '}
      {Object.keys(contacts).map(key => {
        return (
          <Contacts
            key={key}
            contactTitle={key}
            contactValue={contacts[key as keyof ContactsType]}
          />
        );
      })}
    </div>
  </div>
);

export default ProfileData;
