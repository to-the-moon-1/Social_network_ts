import { instance } from './api';

const securityPath = 'security/get-captcha-url';

type GetCaptchaUrlResponseType = {
  url: string;
};

const securityAPI = {
  getCaptchaUrl() {
    return instance.get<GetCaptchaUrlResponseType>(securityPath).then(res => res.data);
  },
};

export default securityAPI;
