import { Injectable } from '@angular/core';

import { ApiRequestService } from './api-request.service';
import { ApiHeaderRequestService } from './api-header-request.service';
import { MovieModel } from '../models/movie.model';
import { HistoryModel } from '../models/history.model';

@Injectable()
export class HistoryService {

  constructor(private _apiHeader: ApiHeaderRequestService, private _apiRequest: ApiRequestService) { }

  listHistory(query?: string) {
    return this._apiRequest.get(`/history${query}`);
  }

  detailHistory(id: string) {
    return this._apiRequest.get(`/history/${id}`)
  }

  createHistory(body: any){
    return this._apiHeader.post(`/history`, body);
  }
}
