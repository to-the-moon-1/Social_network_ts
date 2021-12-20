import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'querystring';

import { FilterType, followThunk, getUsers, unfollowThunk } from '../../redux/users-reducer';
import {
  getAllUsers,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from '../../redux/users-selectors';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

import './Users.css';

type QueryParamsType = { term?: string; page?: string; friend?: string };

export type FriendFormType = 'true' | 'false' | 'null';

export type FormProps = {
  term: string;
  friend: FriendFormType;
};

type UsersPagePropsType = {
  pageTitle: string;
};

const UsersPage: React.FC<UsersPagePropsType> = () => {
  const isFetching = useSelector(getIsFetching);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getAllUsers);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
    const { page, term, friend } = parsed;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (page) actualPage = Number(page);
    if (term) actualFilter = { ...actualFilter, term };

    switch (friend) {
      case 'null':
        actualFilter = { ...actualFilter, friend: null };
        break;
      case 'true':
        actualFilter = { ...actualFilter, friend: true };
        break;
      case 'false':
        actualFilter = { ...actualFilter, friend: false };
        break;
      default:
        return;
    }

    dispatch(getUsers(actualPage, pageSize, actualFilter));
  }, [currentPage, dispatch, filter, history.location.search, pageSize]);

  useEffect(() => {
    const query: QueryParamsType = {};
    if (filter.term) query.term = filter.term;
    if (filter.friend !== null) query.friend = String(filter.friend);
    if (currentPage !== 1) query.page = String(currentPage);

    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    });
  }, [filter, currentPage, history]);

  const onPageChanged = (pageNumber: number): void => {
    dispatch(getUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filters: FilterType): void => {
    dispatch(getUsers(1, pageSize, filters));
  };

  const follow = (userId: number): void => {
    dispatch(followThunk(userId));
  };

  const unfollow = (userId: number): void => {
    dispatch(unfollowThunk(userId));
  };

  const submit = (
    values: FormProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ): void => {
    const { term, friend } = values;
    const filters: FilterType = { term, friend: friend === 'null' ? null : friend === 'true' };

    onFilterChanged(filters);
    setSubmitting(false);
  };

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <Users
        currentPage={currentPage}
        filter={filter}
        follow={follow}
        followingInProgress={followingInProgress}
        onPageChanged={onPageChanged}
        submit={submit}
        unfollow={unfollow}
        users={users}
      />
    </>
  );
};

export default UsersPage;
