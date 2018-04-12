import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { JwtHelper } from 'angular2-jwt';

import { AppConfig } from '../config/app.config';
import { ApiRequestService } from './api-request.service';
import { UserModel } from '../models/user.model'

@Injectable()
export class AuthenticationService {
  private userInfo: any = null;
  private jwtHelper: JwtHelper = new JwtHelper();
  private tokenAuth: string;

  constructor(
    private _http: Http,
    private _router: Router,
    private _location: Location,
    private _appConfig: AppConfig,
    private _apiRequest: ApiRequestService
  ) { }

  public getUserInfo(): any {
    if (!localStorage.current_user) return null;
    return (JSON.parse(localStorage.getItem('current_user')))
  }

  public setUserInfo(userInfo) {
    localStorage.setItem('current_user', JSON.stringify(userInfo));
    this.userInfo = userInfo;
  }

  public authenticate(body: any): any {
    return this._apiRequest.post(`/login`, body)
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
    this._router.navigate(['/home']);
  }

  // ====== token =====
  public setToken(_tokenParam: string) {
    this.tokenAuth = localStorage.getItem('token') || _tokenParam;
  }

  public getToken() {
    return localStorage.getItem('token');
  }

  public jwtDecode(): UserModel {
    try {
      let tokenTemp = this.jwtHelper.decodeToken(localStorage.getItem('token'));
      return tokenTemp;
    } catch (e) {
      localStorage.removeItem('token');
      this._router.navigate(['/login']);
    }
  }

  public verifyToken(): Boolean {
    // todo request api verify token
    if (!localStorage.getItem('token')) {
      this._router.navigate(['/home']);
      return false;
    }
    return true;
  }
}

@Injectable()
export class UserCanActive implements CanActivate {
  constructor(private auth: AuthenticationService,
    private _router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.checkLogin();
  }

  checkLogin() {
    if (this.auth.verifyToken()) {
      console.log('checklogin true');
      return true;
    }
    // Navigate to the login page with extras
    this._router.navigate(['/home']);
    console.log('checklogin false');
    return false;
  }
}




