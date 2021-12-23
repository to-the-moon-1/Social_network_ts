import React from 'react';

import { FilterType } from '../../redux/users/users-reducer';
import { UserType } from '../../types/types';
import { FormProps } from '../../containers/UsersContainer';
import PaginatorContainer from '../../containers/PaginatorContainer';
import User from './User';
import UsersSearchForm from './UsersSearchForm';

type UsersType = {
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

const Users: React.FC<UsersType> = ({
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
    {users.map(user => (
      <User
        key={user.id}
        follow={follow}
        followingInProgress={followingInProgress}
        unfollow={unfollow}
        user={user}
      />
    ))}
    <PaginatorContainer currentPage={currentPage} onPageChanged={onPageChanged} />
  </div>
);

export default Users;
