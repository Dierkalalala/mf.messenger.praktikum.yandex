import BaseApi from './baseApi.js';
import { AuthApi } from './httpTransport.js';
const headers = {
    "Content-type": "application/json"
};
class AuthApiClass extends BaseApi {
    static signIn(userData) {
        return AuthApi.post('/signin', { data: userData, headers: headers });
    }
    static singUp(userData) {
        return AuthApi.post('/signup', { data: userData, headers: headers });
    }
    static request() {
        return AuthApi.get('/user');
    }
    static logOut() {
        return AuthApi.post('/logout', { headers: headers });
    }
}
export default AuthApiClass;
//# sourceMappingURL=auth-api.js.map