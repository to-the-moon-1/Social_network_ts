import React from 'react';
import classes from './MyPosts.module.css'
import Post from "./Post/Post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControl";
import {PostType, ProfileType} from "../../../types/types";
import {Col, Row} from "antd";

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

    // let newPostElement = React.createRef();

    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }

    return <div className={classes.myPosts}>
        <Row>
            <Col span={10}>&nbsp;</Col>
            <Col span={14}>
                <hr style={{opacity: .5}} />
                <h2>My posts</h2>
            </Col>
        </Row>
        <Row>
            <Col span={10}>
                {/*{props.isOwner &&*/}
                {/*<AddNewPostFormRedux onSubmit={onAddPost}/>*/}
                {/*}*/}
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
        <form className={classes.writePost} onSubmit={props.handleSubmit}>
            <div>
                <Field className={classes.textarea} component={Textarea} name={'newPostText'} placeholder={'Enter your post...'} validate={[required, maxLength100]} />
            </div>
            <div>
                {/*<button className={[classes.big-btn, classes.main-btn].join(' ')}>Add post</button>*/}
                <button>Add post</button>
            </div>
        </form>
    )
}

const AddNewPostFormRedux = reduxForm<AddPostFormValuesType, PropsType>({form: 'ProfileAddNewPostForm'}) (AddNewPostForm)

export default MyPosts;
