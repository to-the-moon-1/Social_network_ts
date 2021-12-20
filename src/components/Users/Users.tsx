import React from 'react';

import { FilterType } from '../../redux/users-reducer';
import { UserType } from '../../types/types';
import { FormProps } from './UsersContainer';
import PaginatorContainer from '../Paginator/PaginatorContainer';
import User from './User';
import UsersSearchForm from './UsersSearchForm';

type PropsType = {
  currentPage: number;
  onPageChanged: (pageNumber: number) => void;
  filter: FilterType;
  submit: (
    values: FormProps,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => void;
  users: Array<UserType>;
  followingInProgress: Array<number>;
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
};

const Users: React.FC<PropsType> = ({
  currentPage,
  filter,
  follow,
  followingInProgress,
  onPageChanged,
  submit,
  users,
  unfollow,
}) => (
  <div>
    <UsersSearchForm filter={filter} submit={submit} />
    {users.map(u => (
      <User
        key={u.id}
        follow={follow}
        followingInProgress={followingInProgress}
        unfollow={unfollow}
        user={u}
      />
    ))}
    <PaginatorContainer currentPage={currentPage} onPageChanged={onPageChanged} />
  </div>
);

export default Users;
