import classes from "./Users.module.css";
import React from "react";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";
import {Avatar, Col, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

type PropsType = {
    user: UserType,
    followingInProgress: Array<number>,
    unfollow: (userId: number) => void,
    follow: (userId: number) => void,
}

let User: React.FC<PropsType> = ({user, followingInProgress, unfollow, follow}) => {
    return <Row key={user.id} className={classes.wrapForItem}>
                <Col span={2}>
                        <NavLink to={'/profile/' + user.id}>
                            {user.photos.small != null
                                ? <img className={classes.img} alt={'user'} src={user.photos.small} />
                                : <Avatar className={classes.avatar} style={{backgroundColor: '#1890ff'}} icon={<UserOutlined className={classes.icon} />} />}
                            {/*<img alt={'user'} src={user.photos.small != null ? user.photos.small : userPhoto} />*/}
                        </NavLink>
                </Col>
                    <Col span={18} className={classes.mainInfo}>
                        <span>
                            <div className={classes.name}>{user.name}</div>
                            {/*<div>{u.status}</div>*/}
                        </span>
                        <span>
                            <div className={classes.location}>{'location.country'}</div>
                            <div className={classes.location}>{'location.city'}</div>
                        </span>
                    </Col>
                    <Col span={4}>
                        {user.followed
                            ? <button className={[classes.setBtn2, classes.mainBtn2].join(' ')} disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {unfollow(user.id);}}>Unfollow</button>

                            : <button className={[classes.setBtn2, classes.mainBtn2].join(' ')} disabled={followingInProgress.some(id => id === user.id)}
                                      onClick={() => {follow(user.id);}}>Follow</button>}
                    </Col>
    </Row>
}

export default User;