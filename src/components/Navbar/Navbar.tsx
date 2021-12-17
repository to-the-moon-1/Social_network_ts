import React from 'react';
import {Link, NavLink} from "react-router-dom";
import {Layout, Menu} from 'antd';
import {
    MessageOutlined,
    NotificationOutlined,
    SettingOutlined,
    SoundOutlined,
    TeamOutlined,
    UserOutlined
} from "@ant-design/icons";

const { SubMenu } = Menu;
const { Sider } = Layout;

const Navbar: React.FC = () => (
    <Sider className="site-layout-background" width={300}>
        <Menu
            className="menu"
            mode="inline"
            defaultSelectedKeys={['1']}
        >
            <SubMenu key="sub1" icon={<UserOutlined />} title="My profile">
                <Menu.Item key="1"><Link to='/profile'>Profile</Link></Menu.Item>
                <Menu.Item key="2"><Link to='/dialogs'>Messages</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<MessageOutlined />} title="Chat">
                <Menu.Item key="3"><Link to='/chat'>Chat</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" icon={<NotificationOutlined />} title="News">
                <Menu.Item key="4"><Link to='/news'>News</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<SoundOutlined />} title="Music">
                <Menu.Item key="5"><Link to='/music'>Music</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub5" icon={<TeamOutlined />} title="Users">
                <Menu.Item key="6"><Link to='/users'>Users</Link></Menu.Item>
            </SubMenu>
            <SubMenu key="sub6" icon={<SettingOutlined />} title="Settings">
                <Menu.Item key="7"><NavLink to='/settings'>Settings</NavLink></Menu.Item>
            </SubMenu>
        </Menu>
    </Sider>
)

export default Navbar;
