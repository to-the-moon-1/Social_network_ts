import { Dispatch } from 'redux';

import { BaseThunkType, InferActionsTypes } from '../redux-store';
import { UserType } from '../../types/types';
import usersAPI from '../../api/users-api';
import { APIResponseType } from '../../api/api';

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const SET_FILTER = 'SET_FILTER';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_FOLLOWING_IN_PROGRESS = 'TOGGLE_FOLLOWING_IN_PROGRESS';

export type InitialStateType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  followingInProgress: Array<number>;
  filter: {
    term: string;
    friend: null | boolean;
  };
};

const initialState: InitialStateType = {
  users: [] as Array<UserType>,
  pageSize: 8,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
  filter: {
    term: '',
    friend: null as null | boolean,
  },
};

export type FilterType = typeof initialState.filter;

type FollowSuccessType = { type: typeof FOLLOW; userId: number };
type UnfollowSuccessType = { type: typeof UNFOLLOW; userId: number };
type SetUsersType = { type: typeof SET_USERS; users: Array<UserType> };
type SetCurrentPageType = { type: typeof SET_CURRENT_PAGE; currentPage: number };
type SetTotalUsersCountType = { type: typeof SET_TOTAL_USERS_COUNT; totalUsersCount: number };
type SetFilterType = { type: typeof SET_FILTER; filter: FilterType };
type ToggleIsFetchingType = { type: typeof TOGGLE_IS_FETCHING; isFetching: boolean };
type ToggleFollowingInProgressType = {
  type: typeof TOGGLE_FOLLOWING_IN_PROGRESS;
  isFetching: boolean;
  userId: number;
};

type ActionUsersType =
  | FollowSuccessType
  | UnfollowSuccessType
  | SetUsersType
  | SetCurrentPageType
  | SetTotalUsersCountType
  | SetFilterType
  | ToggleIsFetchingType
  | ToggleFollowingInProgressType;

export const actions = {
  followSuccess: (userId: number) => ({ type: FOLLOW, userId }),
  unfollowSuccess: (userId: number) => ({ type: UNFOLLOW, userId }),
  setUsers: (users: Array<UserType>) => ({ type: SET_USERS, users }),
  setCurrentPage: (currentPage: number) => ({ type: SET_CURRENT_PAGE, currentPage }),
  setTotalUsersCount: (totalUsersCount: number) => ({
    type: SET_TOTAL_USERS_COUNT,
    totalUsersCount,
  }),
  setFilter: (filter: FilterType) => ({ type: SET_FILTER, filter }),
  toggleIsFetching: (isFetching: boolean) => ({ type: TOGGLE_IS_FETCHING, isFetching }),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) => ({
    type: TOGGLE_FOLLOWING_IN_PROGRESS,
    isFetching,
    userId,
  }),
};

export type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

const usersReducer = (action: ActionUsersType, state = initialState): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          return user.id === action.userId ? { ...user, followed: true } : user;
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: state.users.map(user => {
          return user.id === action.userId ? { ...user, followed: false } : user;
        }),
      };
    case SET_USERS: {
      return { ...state, users: action.users };
    }
    case SET_CURRENT_PAGE: {
      return { ...state, currentPage: action.currentPage };
    }
    case SET_TOTAL_USERS_COUNT: {
      return { ...state, totalUsersCount: action.totalUsersCount };
    }
    case SET_FILTER: {
      return { ...state, filter: action.filter };
    }
    case TOGGLE_IS_FETCHING: {
      return { ...state, isFetching: action.isFetching };
    }
    case TOGGLE_FOLLOWING_IN_PROGRESS: {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId),
      };
    }
    default: {
      return state;
    }
  }
};

export const getUsers = (page: number, pageSize: number, filter: FilterType): ThunkType => {
  return async dispatch => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));
    dispatch(actions.setFilter(filter));

    const data = await usersAPI.getUsers(page, pageSize, filter.term, filter.friend);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  dispatch: Dispatch<ActionsTypes>,
  userId: number,
  apiMethod: (userId: number) => Promise<APIResponseType>,
  actionCreator: (userId: number) => ActionsTypes,
): Promise<void> => {
  dispatch(actions.toggleFollowingInProgress(true, userId));
  const response = await apiMethod(userId);

  if (response.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleFollowingInProgress(false, userId));
};

export const followThunk = (userId: number): ThunkType => {
  return async dispatch => {
    await followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      actions.followSuccess,
    );
  };
};

export const unfollowThunk = (userId: number): ThunkType => {
  return async dispatch => {
    await followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      actions.unfollowSuccess,
    );
  };
};

export default usersReducer;
