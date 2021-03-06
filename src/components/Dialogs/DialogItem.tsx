import React from 'react';
import {NavLink} from "react-router-dom";
import {Col, Row} from "antd";

type PropsType = {
    id: number,
    name: string,
    src: string,
    messageText: string,
}

const DialogItem: React.FC<PropsType> = ({id, src, name, messageText}) => {
    let path = '/dialogs/' + id;

    return <div className="dialog">
            <Row>
            <Col span={4}>
                <img className="img-dialog" src={src} alt={'userImage'} />
            </Col>
            <Col span={20} className="wrapper-dialog">
                <NavLink to={path} className="dialog-user-name" activeClassName="active active-dialog">
                    {name}</NavLink>
                <div className="text-dialog">{messageText}</div>
            </Col>
        </Row>
    </div>
}

export default DialogItem;




