import signUpPage from '../static/src/pages/signUp/index'
import jsdom from 'jsdom';
import {assert} from 'chai';
import RouterClass from '../static/vendor/router/index';

describe('Роутер', () => {
    let Router : any

    before(function () {
        Router = RouterClass
        global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
        global.window = document.defaultView;
        global.navigator = global.window.navigator;
    })

    function createNewRouter() {
        return new Router('body');

    }
    it('Роутер должен уметь добавлять роут', () => {
        let router = createNewRouter();
        router.use('/', signUpPage);
        router.start();
        assert.equal(router.routes.length, 1)
    })

    it('Роутер должен уметь перехватывать роуты', () => {
        let router = createNewRouter();
        router.use('/', signUpPage)
        router.use('/hello', signUpPage)
        router.start()
        router.go('/hello');
        if (router._currentRoute !== null) {
            assert.equal(router._currentRoute._pathname, '/hello');
        }
    })
})
