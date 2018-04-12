import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';

import { ApiRequestService } from './api-request.service';
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

  constructor(private _apiRequest: ApiRequestService) { }

  getListMovie(query: string){
    return this._apiRequest.get(`/movie${query}`);
  }

  searchMovie(query: string){
    return this._apiRequest.get(`/movie/search${query}`);
  }

  detailMovie(id: string): Observable<MovieModel> {
    return this._apiRequest.get(`/movie/${id}`)
  }


}
