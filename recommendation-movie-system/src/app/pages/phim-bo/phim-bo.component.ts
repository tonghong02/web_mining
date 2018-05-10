import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MovieService } from '../../services/movie.service';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-phim-bo',
  templateUrl: './phim-bo.component.html',
  styleUrls: ['./phim-bo.component.css']
})
export class PhimBoComponent implements OnInit {

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
  ) {
    this._route.params.subscribe(params => {
      this.category = params['category'];
      console.log("category = " + this.category);
      this.listContact();
    });
  }

  ngOnInit() {
    console.log(this.normalizeTitle("how to do (sesion 3)"));
  }

  listContact() {
    this._movie
      .getListMovie(`?category=${this.category}`)
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
    let url = arr.join('_');
    return url.replace('(', '-').replace(')','-');
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }


}
