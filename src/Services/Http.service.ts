import {$WebWorker} from './WebWorker.service';
import {JSONResponse} from "./JSONResponse.service";

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
  static getJSON(url) {
    return fetch(new Request(url)).then(function(response) {
      return new JSONResponse(response);
    });
  }

  static options(url) {
    return fetch(new Request(url), { method: 'OPTIONS' }).then(function(response) {
      return new JSONResponse(response);
    });
  }
}
