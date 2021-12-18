import React from "react";
import {Avatar, Col, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";

import {ChatMessageType} from "./ChatContainer";

const Message: React.FC<{message: ChatMessageType}> = React.memo(({message}) => (
    <div className="message">
        <Row>
            <Col span={1}>
                {message.photo === null
                    ?   <Avatar className="img-message" style={{backgroundColor: '#1890ff'}} icon={<UserOutlined className="icon icon-message" />} />
                    :   <img className="img-message" alt={''} src={message.photo} />}

            </Col>
            <Col span={23} className="user-message">
                <b className="user-name">{message.userName}</b>
                <div className="text-message">{message.message}</div>
            </Col>
        </Row>
    </div>
))

export default Message;
