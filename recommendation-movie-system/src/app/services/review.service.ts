import { Injectable } from '@angular/core';

import { ApiRequestService } from './api-request.service';
import { ApiHeaderRequestService }  from './api-header-request.service';
import { MovieModel } from '../models/movie.model';

@Injectable()
export class ReviewService {

  constructor(private _apiHeader: ApiHeaderRequestService, private _apiRequest: ApiRequestService) { }


  listReview(query?: string){
    return this._apiRequest.get(`/review${query}`);
  }

  detailReview(id: string){
    return this._apiRequest.get(`/review/${id}`)
  }

  createReview(body: any){
    return this._apiHeader.post(`/review`, body);
  }

}
