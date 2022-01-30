import { createSelector } from 'reselect';
import { UserType } from '../../types/types';

const getAllUsersSelector = (state: {
  usersReducer: { users: Array<UserType> };
}): Array<UserType> => state.usersReducer.users;

export const getAllUsers = createSelector(getAllUsersSelector, (users: Array<UserType>) =>
  users.filter((user: UserType) => user),
);

export const getPageSize = (state: { usersReducer: { pageSize: number } }): number =>
  state.usersReducer.pageSize;

export const getTotalUsersCount = (state: { usersReducer: { totalUsersCount: number } }): number =>
  state.usersReducer.totalUsersCount;

export const getCurrentPage = (state: { usersReducer: { currentPage: number } }): number =>
  state.usersReducer.currentPage;

export const getIsFetching = (state: { usersReducer: { isFetching: boolean } }): boolean =>
  state.usersReducer.isFetching;

export const getFollowingInProgress = (state: {
  usersReducer: { followingInProgress: number[] };
}): number[] => state.usersReducer.followingInProgress;

export const getUsersFilter = (state: {
  usersReducer: { filter: { friend: boolean | null; term: string } };
}): { friend: boolean | null; term: string } => state.usersReducer.filter;
