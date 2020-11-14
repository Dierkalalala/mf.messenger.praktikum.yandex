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
    constructor(prefix) {
        this.baseUrl = 'https://ya-praktikum.tech/api/v2';
        this.get = (url, options = {}) => {
            return this.request(url, Object.assign(Object.assign({}, options), {method: METHODS.GET}), options.timeout);
        };
        this.post = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), {method: METHODS.POST}), options.timeout);
        };
        this.put = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), {method: METHODS.PUT}), options.timeout);
        };
        this.delete = (url, options) => {
            return this.request(url, Object.assign(Object.assign({}, options), {method: METHODS.DELETE}), options.timeout);
        };
        // PUT, POST, DELETE
        // options:
        // headers — obj
        // data — obj
        this.request = (url, options, timeout = 5000) => {
            let {headers, data, method} = options;
            return new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                if (method == METHODS.GET) {
                    try {
                        url += queryStringify(options.data);
                        url = url.substr(0, url.length - 1);
                    } catch (e) {
                        void e;
                    }
                }
                xhr.open(method, this.baseUrl + this.prefix + url);
                if (headers) {
                    Object.keys(headers).forEach(header => {
                        xhr.setRequestHeader(header, headers[header]);
                    });

                }

                xhr.withCredentials = true;

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
                } else {
                    xhr.send(options.data);
                }
            });
        };
        this.prefix = prefix;
    }
}

export const AuthApi = new HTTPTransport('/auth');
export const UserApi = new HTTPTransport('/user');
export const ChatsApi = new HTTPTransport('/chats');
//# sourceMappingURL=httpTransport.js.map
