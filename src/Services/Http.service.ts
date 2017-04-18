import {$WebWorker} from './WebWorker.service';
import {IHttp} from '../Interfaces/IHttp.interface'
import {IHttpResponse} from '../Interfaces/IHttpResponse.interface'

export class Http {
  static getHttpWorker(): IHttp {
    if (!window.$AnthonyCleaver) {
      window.$AnthonyCleaver = {};
    }

    if (!window.$AnthonyCleaver.PresentationGenerator) {
      window.$AnthonyCleaver.PresentationGenerator = {};
    }

    if (!window.$AnthonyCleaver.PresentationGenerator.HttpWebWorker) {
      window.$AnthonyCleaver.PresentationGenerator.HttpWebWorker = new $WebWorker($$Http);
    }

    return window.$AnthonyCleaver.PresentationGenerator.HttpWebWorker;
  }
}

class $$Http {
  static _parseHeaders(headers: Headers): any {
    let out = {},
        headerEntries = headers.entries(),
        header = headerEntries.next();

    while(!header.done) {
      out[header.value[0]] = header.value[1];
      header = headerEntries.next();
    }

    return out;
  }

  static _parseResponse(response: Response): Promise<IHttpResponse> {
    let code: number = response.status;
    let isSuccessfulResponse: boolean = Math.floor(code / 100) === 2;

    return response.json().then(body => {
      if (isSuccessfulResponse) {
        return { status: response.status, body: body, headers: this._parseHeaders(response.headers) };
      }

      return Promise.reject({ status: response.status, body: body, headers: this._parseHeaders(response.headers) });
    });
  }

  static _createRequest(url: string, method: string = 'GET', headers: any = {}, body?: any): Request {
    if (!('Content-Type' in headers)) {
      headers['Content-Type'] = 'application/json';
    }

    if (body) {
      return new Request(url, {
        method: method,
        body: JSON.stringify(body),
        headers: new Headers(headers)
      });
    }

    return new Request(url, {
      method: method,
      headers: new Headers(headers)
    });
  }

  static getJSON(url, headers?: any): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'GET', headers)).then(response => this._parseResponse(response));
  }

  static options(url, headers?: any): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'OPTIONS', headers)).then(response => this._parseResponse(response));
  }

  static remove(url, headers?: any): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'DELETE', headers)).then(response => {
        return { status: response.status, headers: this._parseHeaders(response.headers) }
    });
  }

  static post(url, body, headers?: any): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'POST', headers, body)).then(response => this._parseResponse(response));
  }

  static put(url, body, headers?: any): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'PUT', headers, body)).then(response => this._parseResponse(response));
  }
}
