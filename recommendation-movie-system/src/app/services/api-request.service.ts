import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseOptions, Response } from '@angular/http';
// import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ResponseCustom } from '../models/respon-custom.model';
import { AppConfig } from '../config/app.config';

@Injectable()
export class ApiRequestService {
    private apiUrl: string;
    private options: RequestOptions;

    constructor(
        private _http: Http,
        // private _router: Router,
        private _appConfig: AppConfig, ) {
        // apiUrl = http://localhost:4200/api/v1/
        this.apiUrl = `${this._appConfig.getDomainUrl()}`;
    }

    public mapResponseDefault(res: Response): any | null {
        let out = null;
        try {
            out = res.json();
        } catch (e) {
            console.log("Error mapResponseDefault");
        }
        return out;
    };

    public catchError(err: Response) {
        let out: ResponseCustom = {};
        //console.error(err.json());
        try {
            out.D = err.json().errorMessage;
            out.status = err.status;
            // if (out.status === 401){
            //     localStorage.removeItem('__token');
            // }
        }
        catch (e) {
            console.log("Error catchError")
        }
        return Observable.throw(out);
    }

    public get(pathApi: string, mapResponse?: any) {
        mapResponse = this.mapResponseDefault;
        return this._http
            .get(`${this.apiUrl}${pathApi}`)
            .map(mapResponse)
            .catch(this.catchError);;
    }

    public post(api: string, body: any, mapResponse?: any) {
        // accept mapping object data
        if (mapResponse && mapResponse !== 0 && typeof mapResponse !== 'function') {
            mapResponse = 0;
        }
        if (!mapResponse || mapResponse === 0) {
            mapResponse = this.mapResponseDefault;
        }
        return this._http
            .post(this.apiUrl + api, body)
            .map(mapResponse)
            .catch(this.catchError);
    }

    public put(api: string, body: any, mapResponse?: any) {
        // accept mapping object data
        if (mapResponse && mapResponse !== 0 && typeof mapResponse !== 'function') {
            mapResponse = 0;
        }
        if (!mapResponse || mapResponse === 0) {
            mapResponse = this.mapResponseDefault;
        }
        return this._http
            .put(this.apiUrl + api, body)
            .map(mapResponse)
            .catch(this.catchError);
    }

    public delete(api: string, body?: any) {
        return this._http
            .delete(this.apiUrl + api, body)
            .map(this.mapResponseDefault)
            .catch(this.catchError);
    }

}