import Router from '../static/vendor/router';
import signUpPage from '../static/src/pages/signUp/index'

import {assert} from 'chai';


describe('Роутер', () => {

    function createNewRouter() {
        return new Router('app');
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
