import React, { ChangeEvent, useEffect, useState } from 'react';

type PropsType = {
  status: string;
  updateStatus: (status: string) => void;
};

const ProfileStatusWithHooks: React.FC<PropsType> = ({ status, updateStatus }) => {
  const [editMode, setEditMode] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  useEffect(() => {
    setNewStatus(status);
  }, [status]);

  const activateEditMode = (): void => {
    setEditMode(true);
  };

  const deactivateEditMode = (): void => {
    setEditMode(false);
    updateStatus(newStatus);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewStatus(e.currentTarget.value);
  };

  return (
    <div>
      {!editMode && (
        <div className="status">
          <span onDoubleClick={activateEditMode} title="Please, double click to change!">
            {status || 'No status'}
          </span>
        </div>
      )}
      {editMode && (
        <div>
          <input
            className="status input-status"
            onBlur={deactivateEditMode}
            onChange={onStatusChange}
            value={newStatus}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileStatusWithHooks;
