import React, {useEffect} from 'react';
import Paginator from "../Paginator/Paginator";
import User from "./User";
import UsersSearchForm from "./UsersSearchForm";
import {FilterType, followThunk, getUsers, unfollowThunk} from "../../redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllUsers,
    getCurrentPage,
    getFollowingInProgress,
    getPageSize,
    getUsersFilter
} from "../../redux/users-selectors";
import { useHistory } from 'react-router-dom';
import * as queryString from "querystring";

type PropsType = {
    // currentPage: number,
    // onPageChanged: (pageNumber: number) => void,
    // onFilterChanged: (filter: FilterType) => void,
    // users: Array<UserType>,
    // followingInProgress: Array<number>,
    // unfollow: (userId: number) => void,
    // follow: (userId: number) => void,
}

type QueryParamsType = {term?: string, page?: string, friend?: string};

let Users: React.FC<PropsType> = (props) => {
    // const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const filter = useSelector(getUsersFilter);
    const users = useSelector(getAllUsers);
    const followingInProgress = useSelector(getFollowingInProgress);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;

        let actualPage = currentPage;
        let actualFilter = filter;

        if(parsed.page) actualPage = Number(parsed.page);
        if(parsed.term) actualFilter = {...actualFilter, term: parsed.term as string};

        switch (parsed.friend) {
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break;
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break;
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break;
        };

        dispatch(getUsers(actualPage, pageSize, actualFilter));
    }, []);

    useEffect(() => {
        const query: QueryParamsType = {};
        if(filter.term) query.term = filter.term;
        if(filter.friend !== null) query.friend = String(filter.friend);
        if(currentPage !== 1) query.page = String(currentPage);

        history.push({
            pathname: '/users',
            search: queryString.stringify(query),
        })
    }, [filter, currentPage]);

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter));
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter));
    }

    const follow = (userId: number) => {
        dispatch(followThunk(userId));
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId));
    }

    return <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
        {
            users.map(u => <User user={u}
                                 followingInProgress={followingInProgress}
                                 key={u.id}
                                 unfollow={unfollow}
                                 follow={follow}
            />)
        }
        <Paginator onPageChanged={onPageChanged} currentPage={currentPage} />
    </div>
}

export default Users;