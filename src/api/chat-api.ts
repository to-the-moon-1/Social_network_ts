const socket = 'wss://social-network.samuraijs.com/handlers/ChatHandler.ashx';
const timeOut = 5000;

const subscribers = {
  'messages-received': [] as MessagesReceivedSubscriberType[],
  'status-changed': [] as StatusChangedSubscriberType[],
};

let ws: WebSocket | null = null;

type EventsNamesType = 'messages-received' | 'status-changed';
type EventsValusType = MessagesReceivedSubscriberType | StatusChangedSubscriberType;

const messageHandler = (e: MessageEvent<string>): void => {
  const newMessages = JSON.parse(e.data) as ChatMessageAPIType[];
  subscribers['messages-received'].forEach(subscriber => subscriber(newMessages));
};

const notifySubscribersAboutStatus = (status: StatusType): void => {
  subscribers['status-changed'].forEach(subscriber => subscriber(status));
};

const closeHandler = (): void => {
  notifySubscribersAboutStatus('pending');
  setTimeout(createChannel, timeOut);
};

const openHandler = (): void => {
  notifySubscribersAboutStatus('ready');
};

const errorHandler = (): void => {
  notifySubscribersAboutStatus('error');
};

const cleanUp = (): void => {
  ws?.removeEventListener('close', closeHandler);
  ws?.removeEventListener('message', messageHandler);
  ws?.removeEventListener('open', openHandler);
  ws?.removeEventListener('error', errorHandler);
};

function createChannel(): void {
  cleanUp();
  ws?.close();
  ws = new WebSocket(socket);
  notifySubscribersAboutStatus('pending');
  ws?.addEventListener('close', closeHandler);
  ws?.addEventListener('message', messageHandler);
  ws?.addEventListener('open', openHandler);
  ws?.addEventListener('error', errorHandler);
}

export const chatAPI = {
  start() {
    createChannel();
  },
  stop() {
    subscribers['messages-received'] = [];
    subscribers['status-changed'] = [];
    cleanUp();
    ws?.close();
  },
  subscribe(eventName: EventsNamesType, callback: EventsValusType) {
    subscribers[eventName].push(
      callback as MessagesReceivedSubscriberType & StatusChangedSubscriberType,
    );
    return () => {
      subscribers[eventName] = (subscribers[eventName] as Array<EventsValusType>).filter(
        (subscriber: EventsValusType) => subscriber !== callback,
      ) as MessagesReceivedSubscriberType[] & StatusChangedSubscriberType[];
    };
  },
  unsubscribe(eventName: EventsNamesType, callback: EventsValusType) {
    subscribers[eventName] = (subscribers[eventName] as Array<EventsValusType>).filter(
      (subscriber: EventsValusType) => subscriber !== callback,
    ) as MessagesReceivedSubscriberType[] & StatusChangedSubscriberType[];
  },
  sendMessage(message: string) {
    ws?.send(message);
  },
};

type StatusChangedSubscriberType = (status: StatusType) => void;
type MessagesReceivedSubscriberType = (messages: ChatMessageAPIType[]) => void;

export type ChatMessageAPIType = {
  message: string;
  photo: string;
  userId: string;
  userName: string;
};

export type StatusType = 'pending' | 'ready' | 'error';
