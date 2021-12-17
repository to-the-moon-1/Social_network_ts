import React, {useEffect} from 'react';
import {connect} from "react-redux";
import {compose} from "redux";
import {withRouter} from 'react-router-dom';
import {Route, Switch} from "react-router-dom";
import 'antd/dist/antd.css';
import {Layout} from 'antd';

import {withSuspense} from "./hoc/withSuspense";
import {AppStateType} from "./redux/redux-store";
import {initializeApp} from "./redux/app-reducer";

import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Preloader from "./components/common/Preloader/Preloader";
import UsersPage from "./components/Users/UsersContainer";
import Navbar from "./components/Navbar/Navbar";
import LoginContainer from "./components/Login/LoginContainer";
import AppHeaderContainer from "./components/Header/HeaderContainer";

import './App.css';

const { Content } = Layout;

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("./components/Profile/ProfileContainer"));
const ChatPageContainer = React.lazy(() => import("./pages/Chat/ChatPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>
// type DispatchPropsType = {
//     initializeApp: () => void
// }

const SuspensedDialogs = withSuspense(DialogsContainer)
const SuspensedProfile = withSuspense(ProfileContainer)
const SuspensedChatPage = withSuspense(ChatPageContainer)

const App = (initialized: MapPropsType) => {
    useEffect(() => {
        initializeApp()
    }, []);

        if (!initialized) return <Preloader />

        return (
            <Layout>
                <AppHeaderContainer />
                <Content className="wrapper-content">
                    <Layout className="site-layout-background">
                        <Navbar />
                        <Content className="content-page">
                            <Switch>
                                <Route path='/profile/:userId?' render={() => <SuspensedProfile />} />
                                <Route path='/dialogs'
                                       render={() => <SuspensedDialogs />} />
                                <Route path='/chat'
                                       render={() => <SuspensedChatPage />} />
                                <Route path='/news' render={() => <News />} />
                                <Route path='/music' render={() => <Music />} />
                                <Route path='/settings' render={() => <Settings />} />
                                <Route path='/users' render={() => <UsersPage pageTitle={'Users'} />} />
                                <Route path='/login' render={() => <LoginContainer />} />
                            </Switch>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializeApp})) (App);
