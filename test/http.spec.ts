import {http} from '../static/src/api/httpTransport';

import {assert} from 'chai';
import {createServer, Response} from "miragejs"

interface httpResponseNeededParams {
    [key: string] : unknown
    status: number
}


describe('HTTP запросы', () => {
    before(function () {
        createServer({
            routes() {
                this.namespace = "fake"

                this.post("/chats", (schema, request) => {
                    let attrs = JSON.parse(request.requestBody)
                    attrs.id = Math.floor(Math.random() * 100)

                    return {chats: attrs}
                })

                // Using the `timing` option to slow down the response
                this.get(
                    "/chats",
                    () => {
                        return {
                            movies: [
                                {id: 1, name: "Inception", year: 2010},
                                {id: 2, name: "Interstellar", year: 2014},
                            ],
                        }
                    },
                    {timing: 4000}
                )

                this.delete("/chats", () => {
                    return new Response(200);
                })

                this.put('/chats', () => {
                    return new Response(200);
                })
            },
        })

    });

    let fakeApi = new http('/fake');

    it('GET Запрос должен получать данные', () => {
        fakeApi.get('/chats')
            .then((res: httpResponseNeededParams) => assert.equal(res.movies[0].id, 1))
    })
    it('POTS Запрос должен отправлять данные', () => {
        fakeApi.post('/chats', {data: JSON.stringify({title: 'new title'})})
            .then(res => assert.property(res, 'chats'))
    })
    it('DELETE запрос должен удалять данные', () => {
        fakeApi.put('/chats', {data: JSON.stringify({title: 'new title 2'})})
            .then((res: httpResponseNeededParams) => {
                assert.equal(res.status, 200)
            })
    })
    it('PUT запрос должен обновлять данные', () => {
        fakeApi.delete('/chats', {data: JSON.stringify({title: 'new title'})})
            .then((res: httpResponseNeededParams) => assert.equal(res.status, 200))
    })


});
