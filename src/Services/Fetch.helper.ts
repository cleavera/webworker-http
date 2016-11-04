import {Http} from './Http.service';

function appendLocalHost(url) {
  if (url.substr(0, 1) !== '/') {
    return url;
  }

  return window.location.protocol + '//' + window.location.host + url;
}

export function $fetch(url) {
  let httpWorker: any = Http.getHttpWorker();

  return httpWorker.getJSON(appendLocalHost(url));
}
