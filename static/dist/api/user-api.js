"use strict";
import BaseApi from './baseApi.js';
import { UserApi } from './httpTransport.js';
const headers = {
    "Content-type": "application/json"
};
class UserApiClass extends BaseApi {
    static changeUserProfile(userData) {
        return UserApi.put('/profile', { data: userData, headers });
    }
    static changeUserAvatar(avatar) {
        return UserApi.put('/profile/avatar', { data: avatar, headers: headers });
    }
    static changeUserPassword(userData) {
        return UserApi.put('/password', { data: userData, headers: headers });
    }
    static getUserById(id) {
        return UserApi.get(`/${id}`);
    }
    static searchForUsers(userData) {
        return UserApi.post('/search', { data: userData, headers: headers });
    }
}
export default UserApiClass;
//# sourceMappingURL=user-api.js.map