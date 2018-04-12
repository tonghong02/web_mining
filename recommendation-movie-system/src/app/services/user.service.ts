import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiRequestService } from './api-request.service';
import { ApiHeaderRequestService } from './api-header-request.service';

@Injectable()
export class UserService {

  constructor(private _router: Router, private _apiRequest: ApiRequestService, private _apiHeader: ApiHeaderRequestService) { }

  createUser(body: any){
    return this._apiRequest.post(`/user`, body);
  }

  getUser(id: string){
    return this._apiRequest.get(`/user/${id}`);
  }

  getListUser(){
    return this._apiRequest.get(`/user`);
  }

  updateUser(id: string, body: any){
    return this._apiHeader.put(`/user/${id}`, body);
  }

  deleteUser(id: string){
    return this._apiHeader.delete(`/user/${id}`);
  }


}
