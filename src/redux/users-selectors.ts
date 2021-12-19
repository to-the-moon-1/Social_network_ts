import { createSelector } from 'reselect';
import { UserType } from '../types/types';

const getAllUsersSelector = (state: {
  usersPage: { users: Array<UserType> } }): Array<UserType> => state.usersPage.users;

export const getAllUsers = createSelector(getAllUsersSelector, (users: Array<UserType>) =>
  users.filter((user: UserType) => user));

export const getPageSize = (state: {
  usersPage: { pageSize: number } }): number => state.usersPage.pageSize;

export const getTotalUsersCount = (state: {
  usersPage: { totalUsersCount: number } }): number => state.usersPage.totalUsersCount;

export const getCurrentPage = (state: {
  usersPage: { currentPage: number } }): number => state.usersPage.currentPage;

export const getIsFetching = (state: {
  usersPage: { isFetching: boolean } }): boolean => state.usersPage.isFetching;

export const getFollowingInProgress = (state: {
  usersPage: { followingInProgress: number[] };
}): number[] => state.usersPage.followingInProgress;

export const getUsersFilter = (state: {
  usersPage: { filter: { friend: boolean | null; term: string } };
}): { friend: boolean | null; term: string } => state.usersPage.filter;
