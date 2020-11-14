import AuthApiClass from "../api/auth-api.js";
import store from "../../vendor/state/index.js";
import Router from "../../vendor/router/index.js";
let router = new Router('.app');
function checkForAuth(url : string) {
    if (!store.get('auth').id) {
        AuthApiClass.request()
            .then(function(res) {
                store.set('auth', res.response);
                if (store.checkForAuth()) {
                    router.go(url);
                } else {
                    router.go('/');
                }
            })
            .catch((err) => {
                alert(err);
            });
    }

}

export default checkForAuth
