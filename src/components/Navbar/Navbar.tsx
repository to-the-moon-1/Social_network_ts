import React from 'react';
import classes from './Navbar.module.css';
import {Link, NavLink} from "react-router-dom";
import {Menu} from "antd";
import {
    MessageOutlined,
    NotificationOutlined,
    SettingOutlined,
    SoundOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";
import Sider from "antd/lib/layout/Sider";
import SubMenu from 'antd/lib/menu/SubMenu';

const Navbar: React.FC = () => {
    return <Sider className="site-layout-background" width={300}>
        <Menu
            className={classes.menu}
            mode="inline"
            defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%' }}
        >
            <SubMenu className={classes.item} key="sub1" icon={<UserOutlined />} title="My profile">
                <Menu.Item className={classes.item} key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                <Menu.Item className={classes.item} key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
            </SubMenu>
            <SubMenu className={classes.item} key="sub2" icon={<MessageOutlined />} title="Chat">
                <Menu.Item className={classes.item} key="3"><Link to='/chat'>Chat</Link></Menu.Item>
            </SubMenu>
            <SubMenu className={classes.item} key="sub3" icon={<NotificationOutlined />} title="News">
                <Menu.Item className={classes.item} key="4"><Link to='/news'>News</Link></Menu.Item>
            </SubMenu>
            <SubMenu className={classes.item} key="sub4" icon={<SoundOutlined />} title="Music">
                <Menu.Item className={classes.item} key="5"><Link to='/music'>Music</Link></Menu.Item>
            </SubMenu>
            <SubMenu className={classes.item} key="sub5" icon={<TeamOutlined />} title="Users">
                <Menu.Item className={classes.item} key="6"><Link to='/users'>Users</Link></Menu.Item>
            </SubMenu>
            <SubMenu className={classes.item} key="sub6" icon={<SettingOutlined />} title="Settings">
                <Menu.Item className={classes.item} key="7"><NavLink to='/settings'>Settings</NavLink></Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>
}

export default Navbar;