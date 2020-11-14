"use strict";

import BaseApi from './baseApi.js';
import {UserApi} from './httpTransport.js'

const headers = {
    "Content-type": "application/json"
};

class UserApiClass extends BaseApi {
    static changeUserProfile(userData : string) {
        return UserApi.put('/profile', {data: userData, headers})
    }
    static changeUserAvatar(avatar : FormData) {
        return UserApi.put('/profile/avatar', { data: avatar, headers: headers });
    }
    static changeUserPassword(userData : string) {
        return UserApi.put('/password', { data: userData, headers: headers });
    }
    static getUserById(id : string) {
        return UserApi.get(`/${id}`);
    }
    static searchForUsers(userData : string) {
        return UserApi.post('/search', { data: userData, headers: headers });
    }

}

export default UserApiClass
