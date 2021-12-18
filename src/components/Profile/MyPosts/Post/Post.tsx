import React from 'react';
import {Col, Row} from "antd";

import {ProfileType} from "../../../../types/types";

import mainImg from "../../../../assets/images/post/Tony.jpg";

type PropsType = {
    message: string,
    likesCount: number,
    reposts: number,
    profile: ProfileType | null,
}

const Post: React.FC<PropsType> = ({message, reposts, likesCount, profile}) => (
    <div className="item-post">
        <Row>
            <Col span={4}>
                {/*<img className="img-user-post" alt={''} src={profile?.photos.small} />*/}
                <img className="img-user-post" alt={''} src={mainImg} />
            </Col>
            <Col span={20} className="wrapper-post">
                {/*<span className="name-user-post">{profile?.fullName}</span>*/}
                <span className="name-user-post">Header of post</span>
                <br />
                <div className="wrapper-text-post"><span>{message}</span></div>
            </Col>
        </Row>
        <Row>
            <Col span={13}>&nbsp;</Col>
            <Col span={11} className="activity-post">
                <span className="repost">Repost <span className="count">{reposts}</span></span>
                <span className="like">Like <span className="count">{likesCount}</span></span>
            </Col>
        </Row>
    </div>
)

export default Post;
