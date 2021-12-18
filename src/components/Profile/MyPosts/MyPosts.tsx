import React from 'react';
import {Col, Row} from "antd";

import {FieldValidatorType} from "../../../utils/validators/validators";
import {PostType, ProfileType} from "../../../types/types";

import Post from "./Post/Post";
import AddNewPostFormRedux from "./AddNewPostForm";
import {AddPostFormValuesType} from "./MyPostsContainer";

type PropsType = {
    posts: Array<PostType>,
    maxLength100: FieldValidatorType,
    onAddPost: (values: AddPostFormValuesType) => void,
    isOwner: boolean,
    profile: ProfileType,
}

const MyPosts: React.FC<PropsType> = ({posts, maxLength100, onAddPost, isOwner, profile}) => (
   <div className="wrapper-posts">
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
                    {[...posts]
                        .reverse()
                        .map(({message, reposts, likesCount}) => <Post key={message} message={message} reposts={reposts} likesCount={likesCount} profile={profile} />)}
                </div>
            </Col>
            <Col span={14}>
                {!isOwner &&
                <AddNewPostFormRedux onSubmit={onAddPost} maxLength100={maxLength100} />
                }
            </Col>
        </Row>
    </div>
)

export default MyPosts;
