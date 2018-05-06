import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';
import { ContactModel } from '../../models/contact.model';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';


@Component({
  selector: 'app-phim-bo',
  templateUrl: './phim-bo.component.html',
  styleUrls: ['./phim-bo.component.css']
})
export class PhimBoComponent implements OnInit {

  contactForm: FormGroup;
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(
    private _user: UserService,
    private _router: Router,
    private fb: FormBuilder,
    private _toastr: ToastrService,
    private _pagination: PaginationService
  ) { }

  ngOnInit() {
    this.listContact();
  }

  listContact() {
    this._user
      .getListUser()
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


}
