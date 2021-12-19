import { instance } from './api';

type GetCaptchaUrlResponseType = {
  url: string;
};

const securityAPI = {
  getCaptchaUrl() {
    return instance
      .get<GetCaptchaUrlResponseType>('security/get-captcha-url')
      .then(res => res.data);
  },
};

export default securityAPI;
