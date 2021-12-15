import React from 'react';
import classes from './Header.module.css';
import {Link} from "react-router-dom";
import {Avatar, Col, Menu, Row} from "antd";
import {UserOutlined} from "@ant-design/icons";
import { Header } from 'antd/lib/layout/layout';
import {useDispatch, useSelector} from "react-redux";
import {selectIsAuth, selectLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";

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
        <Row style={{ padding: '0 150px' }}>
            <Col span={18}>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <img className={classes.menuImg} height={45} alt={''} src='https://www.smeg.com/binaries/content/gallery/logo/logo_bianco_no-back.png' />
                </Menu>
            </Col>
            <Col span={6}>
                <div className={classes.loginBlock}>
                    {isAuth
                        ? <div className={classes.item}> <Avatar className={classes.avatar} style={{backgroundColor: '#1890ff'}} icon={<UserOutlined />} />
                            {login}&nbsp;&nbsp;&nbsp; <span className={classes.line}>|</span>&nbsp;&nbsp;&nbsp;<button className={classes.btnLogout} onClick={logoutCallback}>Log out</button></div>
                        : <Link className={classes.item} to={'/login'}>Login</Link>
                    }
                </div>
            </Col>
        </Row>
    </Header>


    // <header className={classes.header}>
    //     <div className='app-wrapper'>
    //         <img alt={''} src='https://www.smeg.com/binaries/content/gallery/logo/logo_bianco_no-back.png' />
    //         <div className={classes.loginBlock}>
    //             {props.isAuth
    //                 ? <div className={classes.item}>{props.login}  | <button className={classes.btnLogout} onClick={props.logout}>Log out</button></div>
    //                 : <NavLink className={classes.item} to={'/login'}>Login</NavLink>
    //             }
    //         </div>
    //     </div>
    // </header>
}

export default AppHeader;