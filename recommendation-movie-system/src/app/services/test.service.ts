import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiRequestService } from './api-request.service';

@Injectable()
export class TestService {

  constructor(private _apiRequest: ApiRequestService, private _http: Http) { }
  result: any;

  // getContact() {
  //   return this._http.get("api/contact")
  //     .map(result => this.result = result.json().data);
  // }

  getContact(){
    return this._apiRequest.get('contact');
  }


}
