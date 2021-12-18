import React from 'react';
import {compose} from "redux";
import {connect} from "react-redux";

import {actions, InitialStateType} from "../../redux/dialogs-reducer";
import {AppStateType} from "../../redux/redux-store";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {maxLengthCreator} from "../../utils/validators/validators";
import Dialogs from "./Dialogs";

import './Dialogs.css';

type PropsType = {
    isAuth: boolean,
    dialogsPage: InitialStateType,
    sendMessage: (messageText: string) => void,
}

export type NewMessageFormType = {
    newMessageBody: string,
}

const DialogsContainer: React.FC<PropsType> = ({dialogsPage, sendMessage, isAuth}) => {
    const maxLength50 = maxLengthCreator(50);
    const state = dialogsPage;

    const onSubmit = (values: NewMessageFormType) => sendMessage(values.newMessageBody);

    return <Dialogs onSubmit={onSubmit} maxLength50={maxLength50} state={state} />
}

const mapStateToProps = (state: AppStateType) => {
    return {
        dialogsPage: state.dialogsPage,
        isAuth: state.auth.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...actions}),
    withAuthRedirect
) (DialogsContainer);
