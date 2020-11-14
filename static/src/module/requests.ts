type DataParams = {
    [key: string]: unknown;
}

type HTTPOptions = {
    method: string,
    data: DataParams,
    headers: DataParams,
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
        return acc + `${res}=${( data[res] as object).toString()}&`
    }, '?')
}

class HTTPTransport {
    get = (url: string , options : HTTPOptions) => {
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options : HTTPOptions) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options : HTTPOptions ) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);

    };

    delete = (url:string, options : HTTPOptions) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // PUT, POST, DELETE

    // options:
    // headers — obj
    // data — obj
    request = (url : string, options : HTTPOptions, timeout = 5000) => {
        let {headers, data, method} = options
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();


            if (method == METHODS.GET) {
                url += queryStringify( ( options.data as DataParams) )
                url = url.substr(0, url.length - 1)
            }


            xhr.open(method as string, url);


            if (headers) {
                Object.keys(headers).forEach(header => {
                    xhr.setRequestHeader(header, ( headers[header] as string))
                })
            }

            xhr.responseType = 'json';

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.timeout = timeout;

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method == METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send( ( options.data as unknown as FormData) );
            }

        })
    };
}
