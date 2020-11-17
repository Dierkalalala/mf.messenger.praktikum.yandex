import baseUri from './baseUrl'
type DataParams = {
    [key: string]: string | number | object;
}

type HTTPOptions = {
    method?: string,
    data?: unknown,
    headers?: DataParams,
    timeout?: number
}

const METHODS = {
    GET: 'GET',
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
};

function queryStringify(data: DataParams) {
    return Object.entries(data).reduce((acc, res) => {
        let keyName = res[0];
        let keyValue = res[1];
        return acc + `${keyName}=${keyValue.toString()}&`
    }, '?')
}

function convert(str: string) {
    return str.replace(/&quot;/g, '"')
        .replace(/&gt;/g, '>')
        .replace(/&lt;/g, '<')
        .replace(/&amp;/g, '&')
}

class HTTPTransport {
    prefix: string;
    baseUrl = baseUri;

    constructor(prefix: string) {
        this.prefix = prefix
    }

    get = (url: string, options: HTTPOptions = {}) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: HTTPOptions) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: HTTPOptions) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);

    };

    delete = (url: string, options: HTTPOptions) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: HTTPOptions, timeout = 5000) => {
        let {headers, data, method} = options
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();


            if (method == METHODS.GET) {
                if (options.data !== undefined) {
                    url += queryStringify((options.data as DataParams))
                    url = url.substr(0, url.length - 1)
                }
            }


            xhr.open(method as string, this.baseUrl + this.prefix + url);


            if (headers) {
                Object.entries(headers).forEach(header => {
                    let headerKey = header[0];
                    let headerValue = header[1] as string
                    xhr.setRequestHeader(headerKey, headerValue)
                })
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

            if(data !== undefined) {
                data = convert((data as string));
            }

            if (method == METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send((options.data as unknown as FormData));
            }

        })
    };
}

export const AuthApi = new HTTPTransport('/auth');
export const UserApi = new HTTPTransport('/user');
export const ChatsApi = new HTTPTransport('/chats');
