import AuthApiClass from "../api/auth-api.js";
import store from "../vendor/state/index.js";
import Router from "../vendor/router/index.js";
let router = new Router('.app');
function checkForAuth(url) {
    if (!store.get('auth').id) {
        AuthApiClass.request()
            .then(function (res) {
            if (res.status === 200) {
                store.set('auth', res.response);
                if (store.checkForAuth()) {
                    router.go(url);
                }
                else {
                    router.go('/');
                }
            }
        })
            .catch((err) => {
            console.log(err);
        });
    }
}
export default checkForAuth;
//# sourceMappingURL=isAuth.js.map