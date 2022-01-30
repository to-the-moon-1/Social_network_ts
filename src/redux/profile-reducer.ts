import { FormAction, stopSubmit } from 'redux-form';
import { PhotosType, PostType, ProfileType } from '../types/types';
import profileAPI from '../api/profile-api';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import smallImg from '../assets/images/post/Tony.jpg';
import largeImg from '../assets/images/tonyMain.jpg';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';

export type InitialStateType = {
  posts: Array<PostType>;
  profile: ProfileType;
  status: string;
};

const initialState: InitialStateType = {
  posts: [
    { id: 1, message: 'It is my first post', reposts: 56, likesCount: 723 },
    { id: 2, message: 'Hi, how are you?', reposts: 41, likesCount: 682 },
  ],
  profile: {
    userId: 1,
    lookingForAJob: false,
    lookingForAJobDescription: '',
    fullName: 'dark_angel',
    contacts: {
      github: '',
      vk: '',
      facebook: '',
      instagram: '',
      twitter: '',
      website: '',
      youtube: '',
      mainLink: '',
    },
    photos: { small: smallImg, large: largeImg },
    aboutMe: '',
  },
  status: 'I am a hero!',
};

type AddPostType = { type: typeof ADD_POST; newPostText: string };
type SetUserProfileType = { type: typeof SET_USER_PROFILE; profile: ProfileType };
type SetStatusType = { type: typeof SET_STATUS; status: string };
type SavePhotoSuccessType = { type: typeof SAVE_PHOTO_SUCCESS; photos: PhotosType };

type ActionProfileType = AddPostType | SetUserProfileType | SetStatusType | SavePhotoSuccessType;

export const actions = {
  addPostActionCreator: (newPostText: string) => ({ type: ADD_POST, newPostText }),
  setUserProfile: (profile: ProfileType) => ({ type: SET_USER_PROFILE, profile }),
  setStatus: (status: string) => ({ type: SET_STATUS, status }),
  savePhotoSuccess: (photos: PhotosType) => ({ type: SAVE_PHOTO_SUCCESS, photos }),
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

const profileReducer = (action: ActionProfileType, state = initialState): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      return {
        ...state,
        posts: [
          ...state.posts,
          { id: state.posts.length + 1, message: action.newPostText, reposts: 0, likesCount: 0 },
        ],
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos },
      };
    }
    default: {
      return state;
    }
  }
};

export const getUserProfile =
  (userId: number): ThunkType =>
    async dispatch => {
      const data = await profileAPI.getProfile(userId);
      dispatch(actions.setUserProfile(data));
    };

export const getStatus =
  (userId: number): ThunkType =>
    async dispatch => {
      const data = await profileAPI.getStatus(userId);
      dispatch(actions.setStatus(data));
    };

export const updateStatus =
  (status: string): ThunkType =>
    async dispatch => {
      try {
        const data = await profileAPI.updateStatus(status);

        if (data.resultCode === 0) {
          dispatch(actions.setStatus(status));
        }
      } catch {
        throw new Error('Something was wrong!');
      }
    };

export const savePhoto =
  (file: File): ThunkType =>
    async dispatch => {
      const data = await profileAPI.savePhoto(file);

      if (data.resultCode === 0) {
        dispatch(actions.savePhotoSuccess(data.data.photos));
      }
    };

export const saveProfile =
  (profile: ProfileType): ThunkType | Promise<any> =>
    async (dispatch, getState): Promise<void> => {
      const { userId } = getState().authReducer;
      const data = await profileAPI.saveProfile(profile);

      if (data.resultCode === 0) {
        if (userId != null) {
          dispatch(getUserProfile(userId));
        } else {
          throw new Error('userId can not be null');
        }
      }
      dispatch(stopSubmit('edit-profile', { _error: data.messages[0] }));
      return Promise.reject(data.messages[0]);
    };

export default profileReducer;
