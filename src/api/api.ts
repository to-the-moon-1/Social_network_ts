import axios from 'axios';
import { UserType } from '../types/types';

const baseURL = 'https://social-network.samuraijs.com/api/1.0/';
const key = 'b8134bfa-c729-4d4d-8e15-028e7e08c9cd';

export const instance = axios.create({
  withCredentials: true,
  baseURL,
  headers: {
    'API-KEY': key,
  },
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type APIResponseType<Data = Record<string, unknown>, RC = ResultCodesEnum> = {
  data: Data;
  messages: Array<string>;
  resultCode: RC;
};
