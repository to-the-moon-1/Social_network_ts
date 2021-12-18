import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";

import {FieldValidatorType, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/Textarea";

import {AddPostFormValuesType} from "./MyPostsContainer";

type PropsType = {
    maxLength100: FieldValidatorType,
}

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = ({handleSubmit, maxLength100}) => (
        <form onSubmit={handleSubmit}>
            <div>
                <Field className="textarea" component={Textarea} name={'newPostText'} placeholder={'Enter your post...'} validate={[required, maxLength100]} />
            </div>
            <div>
                <button className="big-btn main-btn">Add post</button>
            </div>
        </form>
)

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

export default AddNewPostFormRedux;
