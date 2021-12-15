import React from 'react';
import classes from './Post.module.css'
import {ProfileType} from "../../../../types/types";
import {Col, Row} from "antd";
import mainImg from "../../../../assets/images/post/Tony.jpg";

type PropsType = {
    message: string,
    likesCount: number,
    reposts: number,
    profile: ProfileType | null,
}

const Post: React.FC<PropsType> = (props) => {
    return <div className={classes.item}>
        <Row>
            <Col span={4}>
                <img className={classes.userImg} alt={''} src={mainImg} />
            </Col>
            <Col span={20} className={classes.postData}>
                {/*<span className={classes.name}>{props.profile.fullName}</span>*/}
                <span className={classes.name}>Header of post</span>
                <br />
                <div className={classes.wrapPostText}><span>{props.message}</span></div>
            </Col>
        </Row>
        <Row>
            <Col span={13}>&nbsp;</Col>
            <Col span={11} className={classes.active}>
                <span className={classes.repost}>Repost <span className={classes.count}>{props.reposts}</span></span>
                <span className={classes.like}>Like <span className={classes.count}>{props.likesCount}</span></span>
            </Col>
        </Row>
    </div>
}

export default Post;
