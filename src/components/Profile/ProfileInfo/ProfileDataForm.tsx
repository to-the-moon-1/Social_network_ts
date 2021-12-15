import React from "react";
import classes from "./ProfileInfo.module.css";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input, Textarea} from "../../common/FormsControls/FormsControl";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType,
}

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({handleSubmit, profile, error}) => {
    return <form onSubmit={handleSubmit} className={classes.otherInfo}>
        <div className={classes.description}><b className={classes.headDesc}>About me:</b>
            <Field className={classes.textarea} component={Textarea} name={'aboutMe'} placeholder={'About me'} />
        </div>
        <div className={classes.description}><b className={classes.headDesc}>Looking for a job:</b>
            <Field className={classes.checkbox} component={Input} type={'checkbox'} name={'lookingForAJob'} placeholder={''} />
        </div>
        <div className={classes.description}><b className={classes.headDesc}>My professional skills:</b>
            <Field className={classes.textarea} component={Textarea} name={'lookingForAJobDescription'} placeholder={'Professional skills'} />
        </div>
        <div className={classes.contacts}><b className={classes.headDesc}>Contacts:</b> {Object.keys(profile.contacts).map(key => {
            return <div key={key} className={classes.contactItem}>&ndash;&nbsp; {key}:<Field className={classes.input} component={Input} name={'contacts.' + key} placeholder={key} /></div>
        })}</div>
        {error && <div className={classes.formSummaryError}>
            {error}
        </div>}
        <button className={[classes.setBtn, classes.mainBtn, classes.outBtn].join(' ')}>Save</button>
    </form>
}

const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({form: 'edit-profile'})(ProfileDataForm)

export default ProfileDataFormReduxForm;