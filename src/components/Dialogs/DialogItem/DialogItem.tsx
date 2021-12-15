import React from 'react';
import classes from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {Col, Row} from "antd";

type PropsType = {
    id: number,
    name: string,
    src: string,
    messageText: string,
}

const DialogItem: React.FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id;

    return <div className={classes.dialog}>
            <Row>
            <Col span={4}>
                <img className={classes.dialogImg} src={props.src} alt={'userImage'} />
            </Col>
            <Col span={20} className={classes.dialogData}>
                <NavLink to={path} activeClassName={classes.activeDialog}>
                    {props.name}</NavLink>
                <div className={classes.messageText}>{props.messageText}</div>
            </Col>
        </Row>
    </div>
}

export default DialogItem;




