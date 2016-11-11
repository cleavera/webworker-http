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
