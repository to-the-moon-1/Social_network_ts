import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ActionsTypes } from '../../redux/users-reducer';
import { actions, InitialStateType } from '../../redux/dialogs-reducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { maxLengthCreator } from '../../utils/validators/validators';
import Dialogs from './Dialogs';

import './Dialogs.css';

type PropsType = {
  isAuth: boolean;
  dialogsPage: InitialStateType;
  sendMessage: (messageText: string) => void;
};

export type NewMessageFormType = {
  newMessageBody: string;
};

const DialogsContainer: React.FC<PropsType> = ({ dialogsPage, sendMessage }) => {
  const maxLength50 = maxLengthCreator(50);
  const state = dialogsPage;

  const onSubmit = (values: NewMessageFormType): void => sendMessage(values.newMessageBody);

  return <Dialogs maxLength50={maxLength50} onSubmit={onSubmit} state={state} />;
};

const mapStateToProps = (state: {
  dialogsPage: ActionsTypes | InitialStateType;
  auth: { isAuth: boolean };
}): { dialogsPage: ActionsTypes | InitialStateType; isAuth: boolean } => {
  return {
    dialogsPage: state.dialogsPage,
    isAuth: state.auth.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(DialogsContainer);
