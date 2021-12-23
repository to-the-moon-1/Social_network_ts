import React, { ChangeEvent } from 'react';

type ProfileStatusType = {
  activateEditModeStatus: () => void;
  deactivateEditModeStatus: () => void;
  editModeStatus: boolean;
  onStatusChange: (e: ChangeEvent<HTMLInputElement>) => void;
  newStatus: string;
  status: string;
};

const ProfileStatus: React.FC<ProfileStatusType> = ({
  activateEditModeStatus,
  deactivateEditModeStatus,
  editModeStatus,
  newStatus,
  onStatusChange,
  status,
}) => (
  <div>
    {!editModeStatus && (
      <div className="status">
        <span onDoubleClick={activateEditModeStatus} title="Please, double click to change!">
          {status || 'No status'}
        </span>
      </div>
    )}
    {editModeStatus && (
      <div>
        <input
          className="status input-status"
          onBlur={deactivateEditModeStatus}
          onChange={onStatusChange}
          value={newStatus}
        />
      </div>
    )}
  </div>
);

export default ProfileStatus;
