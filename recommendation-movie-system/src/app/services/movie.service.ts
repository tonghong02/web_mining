import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { ApiRequestService } from './api-request.service';
import { ApiHeaderRequestService }  from './api-header-request.service';
import { MovieModel } from '../models/movie.model';

@Injectable()
export class MovieService {
  search: string = '';

  setTextSearch(search: string){
    this.search = search;
  }

  getTextSearch(){
    return this.search;
  }

  constructor(private _apiRequest: ApiRequestService, private _apiHeader: ApiHeaderRequestService) { }

  getListMovie(query: string){
    return this._apiRequest.get(`/movie${query}`);
  }

  searchMovie(query: string){
    return this._apiRequest.get(`/movie/search${query}`);
  }

  detailMovie(id: string): Observable<MovieModel> {
    return this._apiRequest.get(`/movie/${id}`)
  }

  updateMovie(id: string, body: any){
    return this._apiHeader.put(`/movie/${id}`, body );
  }

}