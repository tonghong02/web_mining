import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, ResponseOptions, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

import { TestService } from '../../services/test.service';
import { ContactModel } from '../../models/contact.model';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';
import { HtmlAstPath } from '@angular/compiler';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm: FormGroup;
  private allItems: any[];

  public files: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];

  constructor(
    private _test: TestService,
    private _router: Router,
    private fb: FormBuilder,
    private _toastr: ToastrService,
    private _pagination: PaginationService,
    private _http: Http
  ) {
    this.contactForm = this.fb.group({
      email: [''],
      message: [''],
      name: [''],
      subject: [''],
      image: ['']
    });

    this.files = [];
  }

  ngOnInit() {
    // this.listContact();
    this.listUser();
  }

  // listContact() {
  //   this._test
  //     .getContact()
  //     .subscribe(data => {
  //       console.log(data);
  //       // set items to json response
  //       this.allItems = data;

  //       // initialize to page 1
  //       this.setPage(1);
  //     })
  // }

  listUser(){
    console.log("list user")
    this._test.getUser().subscribe(data => {
      console.log(data);
    });
    console.log("haah")
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

  onSubmit() {
    console.log("submit contact")
    // this._test
    //   .createContact(this.contactForm.value)
    //   .subscribe(data => {
    //     console.log('created success!!!');
    //     this._toastr.success('Hello world!', 'Toastr fun!', { timeOut: 3000 });
    //     this.listContact();
    //     console.log(data);
    //   }, err => {
    //     this._toastr.error('everything is broken', 'Major Error', {
    //       timeOut: 3000,
    //     });
    //   })
  }

  onFileChanged(event: any) {
    this.files = event.target.files[0].name;
    console.log(this.files);
  }
  
  onUpload() {
    const formData = new FormData();
    for (const file of this.files) {
        formData.append(name, file, file.name);
    }
    this._http.post('url', formData).subscribe(x => {
      console.log(x)
    });
  }

}
