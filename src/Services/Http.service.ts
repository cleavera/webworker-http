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
    let out = {};

    for (let pair of headers.entries()) {
      out[pair[0]] = pair[1];
    }

    return out;
  }

  static getJSON(url) {
    return fetch(new Request(url)).then(response => {
      return response.json().then(body => {
        return { status: response.status, body: body, headers: this._parseHeaders(response.headers) };
      });
    });
  }

  static options(url) {
    return fetch(new Request(url), { method: 'OPTIONS' }).then(response => {
      return response.json().then(body => {
        return { status: response.status, body: body, headers: this._parseHeaders(response.headers) };
      });
    });
  }
}
