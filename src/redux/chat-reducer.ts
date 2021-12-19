import { FormAction } from 'redux-form';
import { Dispatch } from 'redux';
import { v1 } from 'uuid';
import { BaseThunkType, InferActionsTypes } from './redux-store';
import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chat-api';

type ChatMessageType = ChatMessageAPIType & { id: string };

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

export type InitialStateType = typeof initialState;

export const actions = {
  messagesReceived: (messages: ChatMessageAPIType[]) =>
    ({
      type: 'MESSAGES_RECEIVED',
      payload: { messages },
    } as const),
  statusChanged: (status: StatusType) =>
    ({
      type: 'STATUS_CHANGED',
      payload: { status },
    } as const),
};

type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes | FormAction>;

const chatReducer = (action: ActionsTypes, state = initialState): InitialStateType => {
  switch (action.type) {
    case 'MESSAGES_RECEIVED':
      return {
        ...state,
        messages: [
          ...state.messages,
          ...action.payload.messages.map(m => ({ ...m, id: v1() })),
        ].filter((m, index, array) => index >= array.length - 100),
      };
    case 'STATUS_CHANGED':
      return {
        ...state,
        status: action.payload.status,
      };
    default: {
      return state;
    }
  }
};

let newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null;

const newMessageHandlerCreator = (
  dispatch: Dispatch,
): ((messages: ChatMessageAPIType[]) => void) => {
  if (newMessageHandler === null) {
    newMessageHandler = messages => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return newMessageHandler;
};

let statusChangedHandler: ((status: StatusType) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch): ((status: StatusType) => void) => {
  if (statusChangedHandler === null) {
    statusChangedHandler = status => {
      dispatch(actions.statusChanged(status));
    };
  }
  return statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async dispatch => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};

export const stopMessagesListening = (): ThunkType => async dispatch => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
  chatAPI.stop();
};

export const sendMessage = (message: string): ThunkType | void => {
  chatAPI.sendMessage(message);
};

export default chatReducer;
