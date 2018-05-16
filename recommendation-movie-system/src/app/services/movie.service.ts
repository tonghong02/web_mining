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

  topIMDB(){
    return this._apiRequest.get(`/movie/top_imdb`);
  }

  topView(){
    return this._apiRequest.get(`/movie/top_view`);
  }

  topRate(){
    return this._apiRequest.get(`/movie/top_rate`);
  }

  topViewCategory(query?: string){
    return this._apiRequest.get(`/movie/top_view_category${query}`);
  }

  searchMovie(query: string){
    return this._apiRequest.get(`/movie/search${query}`);
  }

  detailMovie(title: string): Observable<MovieModel[]> {
    return this._apiRequest.get(`/movie/${title}`)
  }

  updateMovie(id: string, body: any){
    return this._apiRequest.put(`/movie/${id}`, body );
  }
  testReview(){
    return this._apiRequest.get(`/review/user/rate`)
  }
}
