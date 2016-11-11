import {$WebWorker} from './WebWorker.service';

export class Http {
  static getHttpWorker() {
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
  static _parseHeaders(headers: Headers) {
    let out = {},
        headerEntries = headers.entries(),
        header = headerEntries.next();

    while(!header.done) {
      out[header.value[0]] = header.value[1];
      header = headerEntries.next();
    }

    return out;
  }

  static _parseResponse(response: Response) {
    return response.json().then(body => {
      return { status: response.status, body: body, headers: this._parseHeaders(response.headers) };
    });
  }

  static getJSON(url) {
    return fetch(new Request(url)).then(response => this._parseResponse(response));
  }

  static options(url) {
    return fetch(new Request(url), { method: 'OPTIONS' }).then(response => this._parseResponse(response));
  }

  static remove(url) {
    return fetch(new Request(url), { method: 'DELETE' }).then(response => this._parseResponse(response));
  }

  static post(url, body) {
    return fetch(new Request(url), { method: 'POST', body: body }).then(response => this._parseResponse(response));
  }

  static put(url, body) {
    return fetch(new Request(url), { method: 'PUT', body: body }).then(response => this._parseResponse(response));
  }
}
