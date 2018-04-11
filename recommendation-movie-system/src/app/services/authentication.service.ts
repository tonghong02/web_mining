import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';

import { AppConfig } from '../config/app.config';
import { ApiRequestService } from './api-request.service'

@Injectable()
export class AuthenticationService {
  private userInfo: any = null;
  private apiUrl: String;

  constructor(
    private _http: Http,
    private _router: Router,
    private _location: Location,
    private _appConfig: AppConfig,
    private _apiRequest: ApiRequestService
  ) {
    // apiUrl = http://localhost:3000/api
    this.apiUrl = `${this._appConfig.getDomainUrl()}`;
  }

  public getUserInfo(): any {
    if (!localStorage.current_user) return null;
    return (JSON.parse(localStorage.getItem('current_user')))
  }

  public setUserInfo(userInfo) {
    localStorage.setItem('current_user', JSON.stringify(userInfo));
    this.userInfo = userInfo;
  }

  public a(): any{
    return this._apiRequest.get(`/movie`);
  }
  public authenticate(body: any): any {
    return this._apiRequest.post(`/login`, body)


    // return new Promise((resolve, reject) => {
    //   this._http.post(`${this.apiUrl}/login`, body, )
    //     .subscribe(data => {
    //       console.log(data);
    //       this.setUserInfo(data.json());
    //       resolve(data.json().token);
    //     },
    //     err => {
    //       reject(err.json());
    //     }
    //     );
    // });
  }

  public logout(): void {
    localStorage.removeItem('token');
    this._router.navigate(['/contact']);
  }
  // public loadUserInfo(): Promise<boolean> {
  //   const token = localStorage.getItem('token');
  //   return new Promise((resolve) => {
  //     if (!token) {
  //       this._router.navigate(['login']);
  //       return resolve(false);
  //     }
  //     const headers = new Headers({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + token
  //     });
  //     const options = new RequestOptions({ headers: headers });
  //     this._http
  //       .get(`${this.apiUrl}/api/system/users/info`, options)
  //       .subscribe(
  //       (data) => {
  //         this.userInfo = data.json();
  //         this.userInfo.token = token;
  //         resolve(true);
  //       },
  //       (err) => {
  //         localStorage.removeItem('token');
  //         this._router.navigate(['login']);
  //         resolve(false);
  //       }
  //       );
  //   });
  // }



}
