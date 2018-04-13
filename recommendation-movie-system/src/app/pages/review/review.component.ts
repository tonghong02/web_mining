import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { ApiHeaderRequestService } from '../../services/api-header-request.service';
import { ReviewService } from '../../services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  id: string = '';
  listReviews: any;

  constructor(private _router: Router, private _review: ReviewService, private _auth: AuthenticationService, private _apiHeader: ApiHeaderRequestService) {

    this.id = this._auth.jwtDecode()._id;
  }

  ngOnInit() {
    this.getListReview();
  }

  getListReview() {
    this._review.listReview(`?user=${this.id}`).subscribe(data => {
      this.listReviews = data;
      console.log("list reviewwwww");
      console.log(this.listReviews);
    })
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
