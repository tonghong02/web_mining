import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ApiRequestService } from './api-request.service';
import { ApiHeaderRequestService } from './api-header-request.service';

@Injectable()
export class TestService {

  constructor(private _apiHeaderRequest: ApiHeaderRequestService, private _http: Http, private _apiRequest: ApiRequestService) { }
  result: any;

  // getContact() {
  //   return this._http.get("api/contact")
  //     .map(result => this.result = result.json().data);
  // }

  // getContact(){
  //   return this._apiHeaderRequest.get(`/contact`);
  // }

  // createContact(body: any){
  //   return this._apiHeaderRequest.post(`/contact`, body);
  // }

  getUser(){
    return this._apiRequest.get(`/users`);


  }

}
