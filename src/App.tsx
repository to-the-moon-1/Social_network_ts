import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { Layout } from 'antd';

import { initializeApp } from './redux/app-reducer';

import Preloader from './components/common/Preloader/Preloader';
import Navbar from './components/Navbar/Navbar';
import AppHeaderContainer from './containers/HeaderContainer';
import Routers from './components/common/Routers/Routers';

import 'antd/dist/antd.css';
import './App.css';

const { Content } = Layout;

type MapPropsType = ReturnType<typeof mapStateToProps>;

const App = (initialized: MapPropsType): JSX.Element => {
  useEffect(() => {
    initializeApp();
  }, []);

  if (!initialized) return <Preloader />;

  return (
    <Layout>
      <AppHeaderContainer />
      <Content className="wrapper-content">
        <Layout className="site-layout-background">
          <Navbar />
          <Content className="content-page">
            <Routers />
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

const mapStateToProps = (state: {
  appReducer: { initialized: boolean };
}): { initialized: boolean } => ({
  initialized: state.appReducer.initialized,
});

export default compose<React.ComponentType>(
  withRouter,
  connect(mapStateToProps, { initializeApp }),
)(App);
