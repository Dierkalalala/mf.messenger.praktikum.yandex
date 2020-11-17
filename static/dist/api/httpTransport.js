import baseUri from './baseUrl.js';
const METHODS = {
    GET: 'GET',
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};
function queryStringify(data) {
    return Object.entries(data).reduce((acc, res) => {
        let keyName = res[0];
        let keyValue = res[1];
        return acc + `${keyName}=${keyValue.toString()}&`;
    }, '?');
}
function convert(str) {
    return str.replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&');
}
class HTTPTransport {
    constructor(prefix) {
        this.baseUrl = baseUri;
        this.get = (url, options = {}) => {
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
                    if (options.data !== undefined) {
                        url += queryStringify(options.data);
                        url = url.substr(0, url.length - 1);
                    }
                }
                xhr.open(method, this.baseUrl + this.prefix + url);
                if (headers) {
                    Object.entries(headers).forEach(header => {
                        let headerKey = header[0];
                        let headerValue = header[1];
                        xhr.setRequestHeader(headerKey, headerValue);
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
                if (data !== undefined) {
                    data = convert(data);
                }
                if (method == METHODS.GET || !data) {
                    xhr.send();
                }
                else {
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
export const http = HTTPTransport;
//# sourceMappingURL=httpTransport.js.map