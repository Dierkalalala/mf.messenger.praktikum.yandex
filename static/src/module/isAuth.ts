import AuthApiClass from "../api/auth-api";
import store from "../vendor/state/index";
import Router from "../vendor/router/index";
interface Prop {
    [key: string]: unknown
}
let router = new Router('.app');

function checkForAuth(url: string) {
    if (!store.get('auth').id) {
        AuthApiClass.request()
            .then(function (res: Prop) {
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
