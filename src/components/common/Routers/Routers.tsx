import React from 'react';
import { Route, Switch } from 'react-router-dom';
import withSuspense from '../../../hoc/withSuspense';

import News from '../../News/News';
import Music from '../../Music/Music';
import Settings from '../../Settings/Settings';
import UsersPage from '../../../containers/UsersContainer';
import LoginContainer from '../../../containers/LoginContainer';

const DialogsContainer = React.lazy(() => import('../../../containers/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('../../../containers/Profile/ProfileContainer'));
const ChatPageContainer = React.lazy(() => import('../../../containers/ChatContainer'));

const SuspensedDialogs = withSuspense(DialogsContainer);
const SuspensedProfile = withSuspense(ProfileContainer);
const SuspensedChatPage = withSuspense(ChatPageContainer);

const route = [
  { component: SuspensedProfile, path: '/profile/:userId?' },
  { component: SuspensedDialogs, path: '/dialogs' },
  { component: SuspensedChatPage, path: '/chat' },
  { component: News, path: '/news' },
  { component: Music, path: '/music' },
  { component: Settings, path: '/settings' },
  { component: UsersPage, path: '/users' },
  { component: LoginContainer, path: '/login' },
];

const Routers = (): JSX.Element => (
  <Switch>
    {route.map(({ component, path }) => (
      <Route key={path} component={component} path={path} />
    ))}
  </Switch>
);

export default Routers;
