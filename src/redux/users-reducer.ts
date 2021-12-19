import { Dispatch } from 'redux';

import { BaseThunkType, InferActionsTypes } from './redux-store';
import { UserType } from '../types/types';
import usersAPI from '../api/users-api';
import { APIResponseType } from '../api/api';

const initialState = {
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

export type InitialStateType = typeof initialState;
export type FilterType = typeof initialState.filter;

export const actions = {
  followSuccess: (userId: number) => ({ type: 'FOLLOW', userId } as const),
  unfollowSuccess: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: 'SET_USERS', users } as const),
  setCurrentPage: (currentPage: number) => ({ type: 'SET_CURRENT_PAGE', currentPage } as const),
  setTotalUsersCount: (totalUsersCount: number) =>
    ({ type: 'SET_TOTAL_USERS_COUNT', count: totalUsersCount } as const),
  setFilter: (filter: FilterType) => ({ type: 'SET_FILTER', payload: filter } as const),
  toggleIsFetching: (isFetching: boolean) => ({ type: 'TOGGLE_IS_FETCHING', isFetching } as const),
  toggleFollowingInProgress: (isFetching: boolean, userId: number) =>
    ({ type: 'TOGGLE_FOLLOWING_IN_PROGRESS', isFetching, userId } as const),
};

export type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;

const usersReducer = (action: ActionsTypes, state = initialState): InitialStateType => {
  switch (action.type) {
    case 'FOLLOW':
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: true };
          }
          return u;
        }),
      };
    case 'UNFOLLOW':
      return {
        ...state,
        users: state.users.map(u => {
          if (u.id === action.userId) {
            return { ...u, followed: false };
          }
          return u;
        }),
      };
    case 'SET_USERS': {
      return { ...state, users: action.users };
    }
    case 'SET_CURRENT_PAGE': {
      return { ...state, currentPage: action.currentPage };
    }
    case 'SET_TOTAL_USERS_COUNT': {
      return { ...state, totalUsersCount: action.count };
    }
    case 'SET_FILTER': {
      return { ...state, filter: action.payload };
    }
    case 'TOGGLE_IS_FETCHING': {
      return { ...state, isFetching: action.isFetching };
    }
    case 'TOGGLE_FOLLOWING_IN_PROGRESS': {
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
): Promise<any> => {
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
