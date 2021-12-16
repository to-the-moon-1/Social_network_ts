import React from 'react';
import {Link} from "react-router-dom";
import {Avatar, Col, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import { Header } from 'antd/lib/layout/layout';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";

import './Header.css';

// export type MapPropsType = {
//     isAuth: boolean,
//     login: string | null,
// }
//
// export type DispatchPropsType = {
//     logout: () => void,
// }

const AppHeader: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const login = useSelector(selectLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => {
        dispatch(logout())
    }

    return <Header className="header">
        <div className="logo" />
        <Row className="wrapper-header">
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <img className="img-header" alt={''} src='https://www.smeg.com/binaries/content/gallery/logo/logo_bianco_no-back.png' />
                </Menu>
            </Col>
            <Col span={6}>
                <div className="wrapper-login">
                    {isAuth
                        ? <div className="item-login"> <Avatar className="avatar" icon={<UserOutlined />} />
                            {login}&nbsp;&nbsp;&nbsp; <span>|</span>&nbsp;&nbsp;&nbsp;<button className="logout-btn" onClick={logoutCallback}>Log out</button></div>
                        : <Link className="item-login" to={'/login'}>Login</Link>
                    }
                </div>
            </Col>
        </Row>
    </Header>
}

export default AppHeader;
