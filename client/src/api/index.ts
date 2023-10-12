const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

type Body = any; // body can take any value to send
type Query = Record<string, string>;
type Headers = Record<string, string>;
type Options = {
  method: string;
  query?: Query;
  url: string;
  headers?: Headers;
  body?: Body;
}
type FetchOptions = Omit<BodyInit, "body"> & {body?: Body};


const prepareHeaders = (options: Options) => {
  const access_token = localStorage.getItem('a_t');

  let headers: Headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (options.url !== '/auth/signup' || '/auth/login') {
    headers['Authorization'] = `Bearer ${access_token}`;
  }

  return headers;
}

export default class TodoApiClient {
  private readonly base_url;

  constructor() {
    this.base_url =  BASE_API_URL + '/api';
  }

  async request(options: Options) {
    let query = new URLSearchParams(options.query || {}).toString();
    if (query !== '') {
      query = '?' + query;
    }

    let response;
    try {
      //
      response = await fetch(this.base_url + options.url + query, {
        method: options.method,
        headers: prepareHeaders(options),
        body: options.body ? JSON.stringify(options.body) : null
      } as FetchOptions);
    }
    catch (error) {
      response = {
        ok: false,
        status: 500,
        json: async () => { return {
          code: 500,
          message: 'The server is unresponsive',
          description: (error as Error).toString(),
          access_token: undefined,
          data: undefined,
          pagination: undefined
        }; }
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      body: response.status !== 204 ? await response.json() : null
    };
  }

  async get(url: string, query?: Query, options?: Options) {
    return this.request({method: 'GET', url, query, ...options});
  }

  async post(url: string, body: Body, options?: Options) {
    return this.request({method: 'POST', url, body, ...options});
  }

  async patch(url: string, body: Body, options?: Options) {
    return this.request({method: 'PATCH', url, body, ...options});
  }

  async delete(url: string, options?: Options) {
    return this.request({method: 'DELETE', url, ...options});
  }
}