import { Injectable } from '@nestjs/common';

@Injectable()
export class HttpHelperService {

  set params(value) {
    this._params = value;
  }

  set headers(value) {
    this._headers = value;
  }

  set url(value) {
    this._url = value;
  }

  private _params;
  private _headers;
  private _url;

  Post<T>() {

  }
}
