import AuthApiClass from "../api/auth-api";
import store from "../../vendor/state/index";
import Router from "../../vendor/router/index";

let router = new Router('.app');

function checkForAuth(url: string) {
    if (!store.get('auth').id) {
        AuthApiClass.request()
            .then(function (res) {
                if (res.status === 200) {
                    store.set('auth', res.response);
                    if (store.checkForAuth()) {
                        router.go(url);
                    } else {
                        router.go('/');
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

}

export default checkForAuth
