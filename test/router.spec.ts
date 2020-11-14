import Router from '../static/vendor/router';
import Block from '../static/vendor/block'

import {assert} from 'chai';

describe('Роутер', () => {

    function createNewRouter() {
        return new Router('app');
    }
    it('Роутер должен уметь добавлять роут', () => {
        let router = createNewRouter();
        router.use('/', Block);
        router.start();
        assert.equal(router.routes.length, 1)
    })

    it('Роутер должен уметь перехватывать роуты',  () => {
        let router = createNewRouter();
        router.use('/', Block)
        router.use('/hello', Block)
        router.start()
        router.go('/hello');
        assert.equal(router._currentRoute._pathname, '/hello');

    })
})
