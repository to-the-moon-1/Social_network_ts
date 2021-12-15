import React, {ChangeEvent, useEffect, useState} from 'react';
import classes from './ProfileInfo.module.css';

type PropsType = {
    status: string,
    updateStatus: (status: string) => void,
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status)
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

        return <div>
            {!editMode &&
            <div className={classes.status}>
                <span title='Please, double click to change!' onDoubleClick={activateEditMode}>{props.status || 'No status'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input className={classes.status + ' ' + classes.inputStatus} onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
            </div>
            }
        </div>
}

export default ProfileStatusWithHooks;