import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { MovieService } from '../../services/movie.service';
import { ContactModel } from '../../models/contact.model';
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

  detailMovie(id: string){
    this._router.navigateByUrl(`/phim/${id}`);
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }


}
