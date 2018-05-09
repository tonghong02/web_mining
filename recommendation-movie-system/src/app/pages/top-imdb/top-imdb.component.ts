import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-top-imdb',
  templateUrl: './top-imdb.component.html',
  styleUrls: ['./top-imdb.component.css']
})
export class TopImdbComponent implements OnInit {
  private allItems: any[];
  category: string = '';
  listMovies: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(
    private _movie: MovieService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pagination: PaginationService
  ) {}

  ngOnInit() {
    this.listTopIMDB();
  }

  listTopIMDB() {
    this._movie
      .topIMDB()
      .subscribe(data => {
        console.log(data);
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

  normalizeTitle(title: string){
    let arr = title.split(" ");
    return arr.join('_');
  }
}
