import React from 'react';
import './App.css';
import 'antd/dist/antd.css';
import {Link, NavLink, Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from 'react-router-dom';
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";
import UsersPage from "./components/Users/UsersContainer";
import {Layout, Menu} from 'antd';
import { UserOutlined, NotificationOutlined, SoundOutlined, TeamOutlined, SettingOutlined, MessageOutlined } from '@ant-design/icons';
import AppHeader from "./components/Header/Header";
// import classes from "./components/Navbar/Navbar.module.css";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const ChatPageContainer = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

const SuspensedDialogs = withSuspense(DialogsContainer)
const SuspensedProfile = withSuspense(ProfileContainer)
const SuspensedChatPage = withSuspense(ChatPageContainer)

class App extends React.Component<MapPropsType & DispatchPropsType> {

    // catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
    //     alert('Some error occured')
    // }

    componentDidMount() {
        this.props.initializeApp();
        // window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    // componentDidMount() {
    //     window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    // }

    render() {
        if (!this.props.initialized) {
            return <Preloader />
        }

        return (
            <Layout>
                <AppHeader />
                <Content style={{ padding: '0 200px', minHeight: '905px' }}>
                    <Layout className="site-layout-background" style={{ padding: '24px 0' }}>
                        <Sider className="site-layout-background" width={300}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                // defaultOpenKeys={['sub1']}
                                style={{ height: '100%' }}
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
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>
                            <Switch>
                                <Route path='/profile/:userId?'
                                       render={() => <SuspensedProfile />} />
                                <Route path='/dialogs'
                                       render={() => <SuspensedDialogs />} />
                                <Route path='/chat'
                                       render={() => <SuspensedChatPage />} />
                                <Route path='/news' render={() => <News />} />
                                <Route path='/music' render={() => <Music />} />
                                <Route path='/settings' render={() => <Settings />} />
                                <Route path='/users' render={() => <UsersPage pageTitle={'Users'} />} />
                                <Route path='/login' render={() => <Login />} />
                                {/*<Route path='*' render={() => <div>404 page not found</div>} />*/}
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
                {/*<Footer style={{ textAlign: 'center' }}>Social Network ©2021 Created by Ant UED</Footer>*/}
            </Layout>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})) (App);