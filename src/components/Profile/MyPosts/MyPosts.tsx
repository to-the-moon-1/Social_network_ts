import React from 'react';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Col, Row} from "antd";

import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/Textarea";
import {PostType, ProfileType} from "../../../types/types";

import Post from "./Post/Post";


export type MapPropsType = {
    posts: Array<PostType>,
    isOwner: boolean,
    profile: ProfileType | null,
}

export type DispatchPropsType = {
    addPost: (newPostText: string) => void,
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> = (props) => {

    let postsElements = [...props.posts]
        .reverse()
        .map((post, index) => <Post key={index} message={post.message} reposts={post.reposts} likesCount={post.likesCount} profile={props.profile} />)

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return <div className="wrapper-posts">
        <Row>
            <Col span={10}>&nbsp;</Col>
            <Col span={14}>
                <hr className="hr-posts" />
                <h2 className="head-posts">My posts</h2>
            </Col>
        </Row>
        <Row>
            <Col span={10}>
                <div>
                    {postsElements}
                </div>
            </Col>
            <Col span={14}>
                {!props.isOwner &&
                <AddNewPostFormRedux onSubmit={onAddPost}/>
                }
            </Col>
        </Row>
    </div>
}

const maxLength100 = maxLengthCreator(100);

type AddPostFormValuesType = {
    newPostText: string,
}

type PropsType = {
}

const AddNewPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field className="textarea" component={Textarea} name={'newPostText'} placeholder={'Enter your post...'} validate={[required, maxLength100]} />
            </div>
            <div>
                <button className="big-btn main-btn">Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

export default MyPosts;
