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
    return response.json().then(body => {
      return { status: response.status, body: body, headers: this._parseHeaders(response.headers) };
    });
  }

  static _createRequest(url: string, method: string = 'GET', body?: any): Request {
    if (body) {
      return new Request(url, {
        method: method,
        body: JSON.stringify(body),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      });
    }

    return new Request(url, {
      method: method,
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    });
  }

  static getJSON(url): Promise<IHttpResponse> {
    return fetch(this._createRequest(url)).then(response => this._parseResponse(response));
  }

  static options(url): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'OPTIONS')).then(response => this._parseResponse(response));
  }

  static remove(url): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'DELETE')).then(response => this._parseResponse(response));
  }

  static post(url, body): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'POST', body)).then(response => this._parseResponse(response));
  }

  static put(url, body): Promise<IHttpResponse> {
    return fetch(this._createRequest(url, 'PUT', body)).then(response => {
        return { status: response.status, headers: this._parseHeaders(response.headers) }
    });
  }
}
