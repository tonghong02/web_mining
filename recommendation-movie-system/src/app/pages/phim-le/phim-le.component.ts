import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { ApiHeaderRequestService } from '../../services/api-header-request.service';
import { HistoryService } from '../../services/history.service';
import { MovieService } from '../../services/movie.service';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-phim-le',
  templateUrl: './phim-le.component.html',
  styleUrls: ['./phim-le.component.css']
})
export class PhimLeComponent implements OnInit {

  id: string = '';
  listHistorys: any;

  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(
    private _router: Router,
    private _history: HistoryService,
    private _auth: AuthenticationService,
    private _apiHeader: ApiHeaderRequestService,
    private _movie: MovieService,
    private _pagination: PaginationService
  ) {

    this.id = this._auth.jwtDecode()._id;
  }

  ngOnInit() {
    this.getListHistory();
  }

  getListHistory() {
    this._history.listHistory(`?user=${this.id}`).subscribe(data => {
      this.listHistorys = data;
      console.log("list historyyyyyy");
      console.log(this.listHistorys);
      // set items to json response
      this.allItems = data;
      // initialize to page 1
      this.setPage(1);
    })
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagination.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("pagedItems in page " + page);
    console.log(this.pagedItems)
  }

  detailMovie(title: string) {
    let engTitle = this.normalizeTitle(title);
    this._router.navigateByUrl(`/phim/${engTitle}`);
  }

  normalizeCategory(category: string) {
    if (category === 'phim_co_trang') return 'Phim Cổ Trang';
    else if (category === 'phim_hai') return 'Phim Hài';
    else if (category === 'phim_hanh_dong') return 'Phim Hành Động';
    else if (category === 'phim_kinh_di') return 'Phim Kinh Dị';
    else if (category === 'phim_phieu_luu') return 'Phim Phiêu Lưu';
    else if (category === 'phim_tai_lieu') return 'Phim Tài Liệu';
    else if (category === 'phim_tam_ly') return 'Phim Tâm Lý';
    else if (category === 'phim_tinh_cam') return 'Phim Tình Cảm';
    else if (category === 'phim_vien_tuong') return 'Phim Viễn Tưởng';
  }

  normalizeTitle(title: string) {
    let arr = title.split(" ");
    let url = arr.join('_');
    return url.replace('(', '-').replace(')', '-');
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

}
