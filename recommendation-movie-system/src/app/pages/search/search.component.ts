import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ReviewService } from '../../services/review.service';
import { MovieService } from '../../services/movie.service';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listMovies: any;
  search: string = '';

  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(
    private _movie: MovieService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _review: ReviewService,
    private _pagination: PaginationService
  ) {
    this._route.params.subscribe(params => {
      this.search = params['text'];
      this._movie.searchMovie(`?search=${this.search}`).subscribe(data => {
        // data tra ve chua nhieu movie cung title
        this.listMovies = data;
        console.log("searchhhh");
        // removie next movie have same title (only keep one movie for one title)
        var results = [];
        var titleSeen = {}, titleSeenValue = {};
        let len = data.length;
        for (var i = 0, id; i < len; i++) {
            id = data[i].engTitle;
            if (titleSeen[id] !== titleSeenValue) {
                results.push(data[i]);
                titleSeen[id] = titleSeenValue;
            }
        }
        // 
        console.log("all result");
        console.log(results);
        // 

        // set items to json response
        this.allItems = results;
        console.log("all items");
        console.log(this.allItems);
        // initialize to page 1
        this.setPage(1);
      })
    });
  }

  ngOnInit() {
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
