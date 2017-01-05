import * as axios from 'axios';
import * as qs from 'qs';
import { IMe, IToken, ILogin, INoResponse } from './Models';
import { browserHistory } from 'react-router';

enum HTTPMethod {
    GET,
    POST,
    DELETE,
    PATCH
};

const AuthorizationTokenKey = 'token';

class OKClient {
    private baseUrl = 'http://localhost:5000';

    public execute<T>(request: OKRequest<T>) {
        if (request.includeAuthorizationHeader) {
            const token = localStorage.getItem(AuthorizationTokenKey)
            request.withHeader({'Authorization': `Bearer ${token}`});
        } 
        return this.executeHTTPRequest(request);
    }

    private executeHTTPRequest<T>(request: OKRequest<T>) {
        return new Promise<T>((resolve, reject) => {
            const config: Axios.AxiosXHRConfig<Object> = {
                method: 'GET',
                url: request.buildUrl(this.baseUrl),
                headers: request.headers
            };
            if(request.httpMethod === HTTPMethod.POST) {
                config.method = 'POST';
                config.data = request.data;
            } else if (request.httpMethod === HTTPMethod.DELETE) {
                config.method = 'DELETE';
                config.data = request.data;
            } else if (request.httpMethod === HTTPMethod.PATCH ) {
                config.method = 'PATCH';
                config.data = request.data;
            }
            return axios(config)
                .then(response => {
                    const okObject = response.data as T;
                    resolve(okObject);;
                }).catch(error => {
                    this.errorHandler(error, reject);
                });
        });
    }

    private errorHandler(error: any, reject: any) {
        if (error.response.status === 401) {
            browserHistory.push('/login');
        } else {
            // special case because /token responds with an HTTP 400 if username/password is incorrect
            if (error.config.url.indexOf('/token') !== -1) {
                // do we need to do anything or just let the reject happen?
                reject();
            } else {
                // push to error page
            }
        }
    }
}

export class OKRequest<T> {
    private client: OKClient;
    public includeAuthorizationHeader: boolean;
    public url: string;
    public httpMethod: HTTPMethod;
    public data: Object;
    public headers: { [key: string]: any; }
    public queryString: { [key: string]: string }

    public constructor() {
        this.client = new OKClient();
        this.url = '';
        this.httpMethod = HTTPMethod.GET;
        this.data = {};
        this.headers = {};
        this.queryString = {};
        this.includeAuthorizationHeader = false;
    }

    public buildUrl(baseUrl: string) {
        let requestUrl = baseUrl;
        if (this.url) {
            const separator = this.url.startsWith('/') ? '' : '/';
            requestUrl = `${requestUrl}${separator}${this.url}`
        }
        if (this.queryString) {
            requestUrl = `${requestUrl}?${qs.stringify(this.queryString)}`;
        }
        return requestUrl;
    }

    public get(url: string) {
        this.httpMethod = HTTPMethod.GET;
        this.url = url;
        return this;
    }

    public post(url: string) {
        this.httpMethod = HTTPMethod.POST;
        this.url = url;
        return this;
    }

    public patch(url: string) {
        this.httpMethod = HTTPMethod.PATCH;
        this.url = url;
        return this;
    }

    public delete(url: string) {
        this.httpMethod = HTTPMethod.DELETE;
        this.url = url;
        return this;
    }

    // can't actually add header here, since getting the token requires an async call. wait to do that on the execute at the client level
    // that comment is from the mobile Api client, but keep this the same here for consistency
    public withAuthorization() {
        this.includeAuthorizationHeader = true;
        return this;
    }

    public withData(data: Object) {
        this.data = data;
        // will we need any other content-type? maybe for a file upload, i.e. avatar image
        return this.withHeader({'Content-Type': 'application/json'});
    }

    public withNonJsonData(data: Object, header: Object) {
        this.data = qs.stringify(Object.assign({}, this.data, data));
        this.headers = Object.assign({}, this.headers, header);
        return this;
    }

    public withHeader(header: Object) {
        this.headers = Object.assign({}, this.headers, header);
        return this;
    }

    public withQueryString(query: Object) {
        this.queryString = Object.assign({}, this.queryString, query);
        return this;
    }

    public execute(): Promise<T> {
        return this.client.execute<T>(this);
    }
}

export function login(email: string, password: string) {
    const loginData: ILogin = {
        email: email,
        password: password
    };
    const request = new OKRequest<IToken>();
    return request.post('/token')
        .withNonJsonData(loginData, {'Content-Type': 'application/x-www-form-urlencoded'});
}

export function getMe() {
    return `{firstName: "Jeff", lastName: "Noble"}`;
    // const request = new OKRequest<IMe>();
    // return request.get('/api/me')
    //     .withAuthorization();
}

// export function updateMe(me: IMe) {
//     const request = new OKRequest<IMe>();
//     return request.patch('/api/me')
//         .withAuthorization()
//         .withData(me);
// }