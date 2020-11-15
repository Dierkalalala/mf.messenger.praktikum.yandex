"use strict";
const METHODS = {
    GET: 'GET',
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};
function queryStringify(data) {
    return Object.keys(data).reduce((acc, res) => {
        return acc + `${res}=${data[res].toString()}&`;
    }, '?');
}
class HTTPTransport {
    constructor() {
        this.get = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.GET }), options.timeout);
        };
        this.post = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.POST }), options.timeout);
        };
        this.put = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.PUT }), options.timeout);
        };
        this.delete = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), { method: METHODS.DELETE }), options.timeout);
        };
        // PUT, POST, DELETE
        // options:
        // headers — obj
        // data — obj
        this.request = (url, options, timeout = 5000) => {
            let { headers, data, method } = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                if (method == METHODS.GET) {
                    url += queryStringify(options.data);
                    url = url.substr(0, url.length - 1);
                }
                xhr.open(method, url);
                if (headers) {
                    Object.keys(headers).forEach(header => {
                        xhr.setRequestHeader(header, headers[header]);
                    });
                }
                xhr.responseType = 'json';
                xhr.onload = function () {
                    resolve(xhr);
                };
                xhr.timeout = timeout;
                xhr.onabort = reject;
                xhr.onerror = reject;
                xhr.ontimeout = reject;
                if (method == METHODS.GET || !data) {
                    xhr.send();
                }
                else {
                    xhr.send(options.data);
                }
            });
        };
    }
}
//# sourceMappingURL=requests.js.map