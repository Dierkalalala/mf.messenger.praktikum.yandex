import BaseApi from './baseApi';
import { AuthApi } from './httpTransport';
const headers = {
    "Content-type": "application/json"
};
class AuthApiClass extends BaseApi {
    static signIn(userData : string) {
        return AuthApi.post('/signin', { data: userData, headers: headers });
    }
    static singUp(userData : string) {
        return AuthApi.post('/signup', { data: userData, headers: headers });
    }
    static request() {
        return AuthApi.get('/user');
    }
    static logOut() {
        return AuthApi.post('/logout', {headers: headers });
    }
}
export default AuthApiClass;
