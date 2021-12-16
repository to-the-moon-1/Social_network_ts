import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {Input, Textarea} from "../../common/FormsControls/FormsControl";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType,
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit} className="wrapper-profile-form">
        <div className="wrapper-field"><b>About me:</b>
            <Field className="textarea textarea-profile" component={Textarea} name={'aboutMe'} placeholder={'About me'} />
        </div>
        <div className="wrapper-field"><b>Looking for a job:</b>
            <Field className="checkbox checkbox-profile" component={Input} type={'checkbox'} name={'lookingForAJob'} placeholder={''} />
        </div>
        <div className="wrapper-field"><b>My professional skills:</b>
            <Field className="textarea textarea-profile" component={Textarea} name={'lookingForAJobDescription'} placeholder={'Professional skills'} />
        </div>
        <div className="wrapper-field"><b>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key} className="item-field">&ndash;&nbsp; {key}:<Field className="input input-profile" component={Input} name={'contacts.' + key} placeholder={key} /></div>
        })}</div>
        {error && <div className="form-summary-error">
            {error}
        </div>}
        <button className="big-btn main-btn save-btn">Save</button>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;
