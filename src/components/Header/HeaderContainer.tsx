import React from 'react';
import {useDispatch, useSelector} from "react-redux";

import {selectIsAuth, selectLogin} from "../../redux/auth-selectors";
import {logout} from "../../redux/auth-reducer";
import AppHeader from "./Header";

import './Header.css';

const AppHeaderContainer: React.FC = () => {
    const isAuth = useSelector(selectIsAuth)
    const loginCallback = useSelector(selectLogin)

    const dispatch = useDispatch()

    const logoutCallback = () => dispatch(logout())

    return <AppHeader isAuth={isAuth} loginCallback={loginCallback} logoutCallback={logoutCallback} />
}

export default AppHeaderContainer;
