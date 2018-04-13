import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { MovieService } from '../../../services/movie.service';
import { ReviewService } from '../../../services/review.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MovieModel } from '../../../models/movie.model';
import { UserModel } from '../../../models/user.model'


@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  id: string = '';
  movie: MovieModel;
  isLogin: boolean = false;
  currentUser: UserModel;
  reviewForm: FormGroup;
  mesRate: string = '';
  mesContent: string = '';
  isErr = false;
  listReviews: any;

  src1: string = 'assets/images/star.png';
  src2: string = 'assets/images/star.png';
  src3: string = 'assets/images/star.png';
  src4: string = 'assets/images/star.png';
  src5: string = 'assets/images/star.png';

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _movie: MovieService, private _route: ActivatedRoute, private _authentication: AuthenticationService, private _review: ReviewService) {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this._movie.detailMovie(this.id).subscribe(data => {
        this.movie = data;
        console.log("detail movie");
        console.log(this.movie);
      })
    });

    if (this._authentication.getToken()) {
      this.isLogin = true;
      if (this._authentication.jwtDecode) {
        this.currentUser = this._authentication.jwtDecode();
        console.log("current user")
        console.log(this.currentUser);
      }
    }

    this.reviewForm = this.fb.group({
      user: [this.currentUser._id, Validators.required],
      movie: [this.id, Validators.required],
      rate: [null, Validators.required],
      content: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.getListReview();
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  setRate(rate: number) {
    this.mesRate = '';
    this.reviewForm.controls['rate'].setValue(rate);
    if (rate === 0) {
      this.src1 = 'assets/images/star.png';
      this.src2 = 'assets/images/star.png';
      this.src3 = 'assets/images/star.png';
      this.src4 = 'assets/images/star.png';
      this.src5 = 'assets/images/star.png';
    }
    else if (rate === 1) {
      this.src1 = 'assets/images/star1.png';
      this.src2 = 'assets/images/star.png';
      this.src3 = 'assets/images/star.png';
      this.src4 = 'assets/images/star.png';
      this.src5 = 'assets/images/star.png';
    }
    else if (rate === 2) {
      this.src1 = 'assets/images/star1.png';
      this.src2 = 'assets/images/star1.png';
      this.src3 = 'assets/images/star.png';
      this.src4 = 'assets/images/star.png';
      this.src5 = 'assets/images/star.png';
    }
    else if (rate === 3) {
      this.src1 = 'assets/images/star1.png';
      this.src2 = 'assets/images/star1.png';
      this.src3 = 'assets/images/star1.png';
      this.src4 = 'assets/images/star.png';
      this.src5 = 'assets/images/star.png';
    }
    else if (rate === 4) {
      this.src1 = 'assets/images/star1.png';
      this.src2 = 'assets/images/star1.png';
      this.src3 = 'assets/images/star1.png';
      this.src4 = 'assets/images/star1.png';
      this.src5 = 'assets/images/star.png';
    }
    else if (rate === 5) {
      this.src1 = 'assets/images/star1.png';
      this.src2 = 'assets/images/star1.png';
      this.src3 = 'assets/images/star1.png';
      this.src4 = 'assets/images/star1.png';
      this.src5 = 'assets/images/star1.png';
    }
  }

  getListReview() {
    this._review.listReview(`?movie=${this.id}`).subscribe(data => {
      this.listReviews = data;
      console.log("list reviews!!!!")
      console.log(this.listReviews);
    })
  }

  review() {
    console.log("REviewed!!!!!!!!!!!!!");
    if (this.reviewForm.get('rate').hasError('required')) {
      this.mesRate = 'Ratesdsad and content is required';
      this.isErr = true;
    }
    if (this.reviewForm.get('content').hasError('required')) {
      this.mesContent = 'Rate and content is required';
      this.isErr = true;
    }
    console.log(this.isErr);

    if(this.isErr === false){
      this._review.createReview(this.reviewForm.value).subscribe(data => {
        if (data.err) {
          this._toastr.error(data.err, 'Error!');
        }
        else {
          this.reviewForm.controls['content'].patchValue('');
          this.setRate(0);
          this.getListReview();
          this._toastr.success('Review success!', 'Success!');
        }
        console.log(data);
      })
    }
    
    
  }






}
