import { instance, APIResponseType, ResultCodeForCaptcha, ResultCodesEnum } from './api';

const authMePath = 'auth/me';
const authLoginPath = 'auth/login';

type MeResponseDataType = {
  id: number;
  email: string;
  login: string;
};

type LoginResponseDataType = {
  userId: number;
};

const authAPI = {
  me: () => instance.get<APIResponseType<MeResponseDataType>>(authMePath).then(res => res.data),

  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance
      .post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>(
      authLoginPath,
      { email, password, rememberMe, captcha },
    )
      .then(res => res.data);
  },

  logout: () => instance.delete(authLoginPath),
};

export default authAPI;
