import { GetItemsType, instance, APIResponseType } from './api';

const followPath = 'follow';

const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10, term = '', friend: null | boolean = null) {
    return instance
      .get<GetItemsType>(
      `users?page=${currentPage}&count=${pageSize}&term=${term}${
        friend === null ? '' : `&friend=${friend.toString()}`
      }`,
    )
      .then(res => res.data);
  },

  follow(id: number) {
    return instance.post<APIResponseType>(`${followPath}/${id}`).then(res => res.data);
  },

  unfollow(id: number) {
    return instance.delete<Promise<APIResponseType>>(`${followPath}/${id}`).then(res => res.data);
  },
};

export default usersAPI;
