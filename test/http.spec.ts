import AuthApi from "../static/src/api/auth-api";

import {assert} from 'chai';

describe('HTTP запросы', () => {
    it('Авторизация должна возвращать статус 200 при валидных данных', () => {
        AuthApi.signIn(JSON.stringify({login: 'diyorbest@gmail.com', password: '070707diyor'}))
            .then(res => assert.equal(res.status, 200))
    })

    it('Авторизация должна возврашать статус 401 при неприавильных данных', () => {
        AuthApi.signIn(JSON.stringify({login: 'diyorbest@gmail', password: '070707diyor'}))
            .then(res => assert.equal(res.status, 401))
    })

    it('Регистрация должна проходить при валидных данных', () => {
        AuthApi.signIn(JSON.stringify({
            email: "dierkaa@yandex.r",
            first_name: "dierkaa@yandex.r",
            login: "dierkaa@yandex.r",
            password: "123456789qwerty",
            phone: "+7(123)123-12-32",
            second_name: "dierkaa@yandex.r"
        }))
            .then(res => assert.equal(res.status, 200))
    })

    it('При запросе с авторизованного аккаунта должны возвращаться данные о пользователе', () => {
        AuthApi.signIn(JSON.stringify({login: 'diyorbest@gmail.com', password: '070707diyor'}))
            .then((res) => {
                AuthApi.request()
                    .then(resp => assert.property(resp, 'id'));
            })
    })

    it('Запрос с неавторизованного аккаунта должен возвращать ошибку', () => {
        AuthApi.request()
            .then()
            .catch(err => assert.equal(err.status, 500))
    })

})
