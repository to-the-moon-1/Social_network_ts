import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { ActionsTypes } from '../redux/users/users-reducer';
import { actions, InitialStateType } from '../redux/dialogs-reducer';
import withAuthRedirect from '../hoc/withAuthRedirect';
import { maxLengthCreator } from '../utils/validators';

import Dialogs from '../components/Dialogs/Dialogs';

import '../styles/Dialogs.css';

type DialogsContainerType = {
  isAuth: boolean;
  dialogsReducer: InitialStateType;
  sendMessage: (messageText: string) => void;
};

export type NewMessageFormType = {
  newMessageBody: string;
};

const DialogsContainer: React.FC<DialogsContainerType> = ({ dialogsReducer, sendMessage }) => {
  const maxLength50 = maxLengthCreator(50);
  const state = dialogsReducer;

  const onSubmit = (values: NewMessageFormType): void => sendMessage(values.newMessageBody);

  return <Dialogs maxLength50={maxLength50} onSubmit={onSubmit} state={state} />;
};

const mapStateToProps = (state: {
  dialogsReducer: ActionsTypes | InitialStateType;
  authReducer: { isAuth: boolean };
}): { dialogsReducer: ActionsTypes | InitialStateType; isAuth: boolean } => {
  return {
    dialogsReducer: state.dialogsReducer,
    isAuth: state.authReducer.isAuth,
  };
};

export default compose<React.ComponentType>(
  connect(mapStateToProps, { ...actions }),
  withAuthRedirect,
)(DialogsContainer);
