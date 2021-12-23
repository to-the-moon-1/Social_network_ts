import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import queryString from 'querystring';

import { FilterType, followThunk, getUsers, unfollowThunk } from '../redux/users/users-reducer';
import {
  getAllUsers,
  getCurrentPage,
  getFollowingInProgress,
  getIsFetching,
  getPageSize,
  getUsersFilter,
} from '../redux/users/users-selectors';
import Preloader from '../components/common/Preloader/Preloader';
import Users from '../components/Users/Users';

import '../styles/Users.css';

type QueryParamsType = { term?: string; page?: string; friend?: string };

export const enum FriendFormTypeEnum {
  true = 'true',
  false = 'false',
  null = 'null',
}

export type FriendFormType =
  | FriendFormTypeEnum.true
  | FriendFormTypeEnum.false
  | FriendFormTypeEnum.null;

export type FormProps = {
  term: string;
  friend: FriendFormType;
};

const UsersPage: React.FC = () => {
  const isFetching = useSelector(getIsFetching);
  const pageSize = useSelector(getPageSize);
  const currentPage = useSelector(getCurrentPage);
  const filter = useSelector(getUsersFilter);
  const users = useSelector(getAllUsers);
  const followingInProgress = useSelector(getFollowingInProgress);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const parsedParams = queryString.parse(history.location.search.substr(1)) as QueryParamsType;
    const { page, term, friend } = parsedParams;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (page) actualPage = +page;
    if (term) actualFilter = { ...actualFilter, term };

    switch (friend) {
      case FriendFormTypeEnum.null:
        actualFilter = { ...actualFilter, friend: null };
        break;
      case FriendFormTypeEnum.true:
        actualFilter = { ...actualFilter, friend: true };
        break;
      case FriendFormTypeEnum.false:
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
    if (filter.friend !== null) query.friend = filter.friend.toString();
    if (currentPage !== 1) query.page = currentPage.toString();

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
