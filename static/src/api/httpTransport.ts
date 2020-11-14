type DataParams = {
    [key: string]: unknown;
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
    return Object.keys(data).reduce((acc, res) => {
        return acc + `${res}=${(data[res] as object).toString()}&`
    }, '?')
}
function convert(str){
    return str.replace(/&quot;/g,'"')
        .replace(/&gt;/g,'>')
        .replace(/&lt;/g,'<')
        .replace(/&amp;/g,'&')
}
class HTTPTransport {
    prefix: string;
    baseUrl = 'https://ya-praktikum.tech/api/v2';

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
                try {
                    url += queryStringify((options.data as JSON))
                    url = url.substr(0, url.length - 1)
                } catch (e) {
                    void e
                }
            }


            xhr.open(method as string, this.baseUrl + this.prefix + url);


            if (headers) {
                Object.keys(headers).forEach(header => {
                    xhr.setRequestHeader(header, ((headers as DataParams)[header] as string))
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

            for (let key in (data as object)  ) {
                if (typeof data[key] === 'string' || typeof data[key] === 'number') {
                    data[key] = convert(data[key]);
                }
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
