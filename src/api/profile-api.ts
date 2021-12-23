import { instance, APIResponseType } from './api';
import { PhotosType, ProfileType } from '../types/types';

const profilePath = 'profile';
const statusPath = 'profile/status';

type SavePhotoResponseDataType = {
  photos: PhotosType;
};

const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`${profilePath}/${userId}`).then(res => res.data);
  },

  getStatus(userId: number) {
    return instance.get<string>(`${statusPath}/${userId}`).then(res => res.data);
  },

  updateStatus(status: string) {
    return instance.put<APIResponseType>(statusPath, { status }).then(res => res.data);
  },

  savePhoto(photoFile: File) {
    const formData = new FormData();
    formData.append('image', photoFile);

    return instance
      .put<APIResponseType<SavePhotoResponseDataType>>(`${profilePath}/photo`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => res.data);
  },

  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(profilePath, profile).then(res => res.data);
  },
};

export default profileAPI;
