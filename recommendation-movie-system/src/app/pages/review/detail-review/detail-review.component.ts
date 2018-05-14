import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";
// import * as _ from 'underscore'; 

import { MovieService } from '../../../services/movie.service';
import { ReviewService } from '../../../services/review.service';
import { HistoryService } from '../../../services/history.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MovieModel } from '../../../models/movie.model';
import { UserModel } from '../../../models/user.model'


@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  engTitle: string = '';
  movie: MovieModel;
  isLogin: boolean = false;
  currentUser: UserModel;
  reviewForm: FormGroup;
  mesRate: string = '';
  mesContent: string = '';
  isErr = false;
  listReviews: any;
  idUser: string = '';

  src1: string = 'assets/images/star.png';
  src2: string = 'assets/images/star.png';
  src3: string = 'assets/images/star.png';
  src4: string = 'assets/images/star.png';
  src5: string = 'assets/images/star.png';

  constructor(private fb: FormBuilder, private _toastr: ToastrService, private _movie: MovieService, private _route: ActivatedRoute, private _router: Router, private _authentication: AuthenticationService, private _review: ReviewService, private _history: HistoryService) {
    this._route.params.subscribe(params => {
      this.engTitle = this.normalizeTitle(params['engTitle']);
      console.log("name english: " + this.engTitle);
      let category: string = '';
      this._movie.detailMovie(this.engTitle).subscribe(data => {
        this.movie = data[0];
        for (let i = 0; i < data.length; i++) {
          if (i === data.length - 1) {
            category += data[i].category;
          } else {
            category += data[i].category + ','
          }
        }
        this.movie.category = category;
        console.log("category.... : " + category);

        console.log("detail movie");
        console.log(this.movie);
      });
    });

    if (this._authentication.getToken()) {
      this.isLogin = true;
      if (this._authentication.jwtDecode) {
        this.currentUser = this._authentication.jwtDecode();
        this.idUser = this.currentUser._id;
        console.log("current user")
        console.log(this.currentUser);
        // add movie into history
        let body = {
          user: this.idUser,
          movie: this.engTitle
        }
        console.log("body")
        console.log(body)
        // this._history.createHistory(body).subscribe(data => {
        //   console.log("create history");
        //   console.log(data);
        // }, err => {
        //   console.log(err);
        // })
      }
    }
    console.log(this.currentUser)
    this.reviewForm = this.fb.group({
      user: [!this.currentUser ? null : this.currentUser._id, Validators.required],
      idMovie: [null, Validators.required],
      movie: [this.engTitle, Validators.required],
      rate: [null, Validators.required],
      content: ['', Validators.required]
    })


  }

  ngOnInit() {
    this.getListReview();
    this.test();
    // this.reviewForm.controls['idMovie'].setValue(this.movie._id);
    // console.log(this.normalizeTitle("how_to_do_-sesion_3-"));
    // console.log(this.showCategory("phim_phieu_luu,phim_tinh_cam,phim_vien_tuong"));
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

  test(){
    this._movie.testReview().subscribe(data => {
      console.log(data);
    });
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

  showCategory(category: string) {
    let arr = category.split(",");
    let result: String = '';

    for (let i = 0; i < arr.length; i++) {
      result += this.normalizeCategory(arr[i]) + ", ";
    }
    return result;
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

  watchMovie() {
    let i = 1;
    console.log(i++);
  }

  getListReview() {
    this._review.listReview(`?movie=${this.engTitle}`).subscribe(data => {
      this.listReviews = data;
      console.log("list reviews!!!!")
      console.log(this.listReviews);

    }, err => {
      console.log(err)
    })
  }

  normalizeTitle(title: string) {
    title = title.replace("-", "(").replace("-", ")");
    let arr = title.split("_");
    return arr.join(' ');
  }

  review() {
    this.reviewForm.controls['idMovie'].setValue(this.movie._id);
    if (this.reviewForm.get('rate').hasError('required')) {
      this.mesRate = 'Rate is required';
      this.isErr = true;
    }
    if (this.reviewForm.get('content').hasError('required')) {
      this.mesContent = 'Content is required';
      this.isErr = true;
    }
    console.log("err: " + this.isErr);

    if (this.isErr === false) {
      this._review.createReview(this.reviewForm.value).subscribe(data => {
        this.reviewForm.controls['content'].patchValue('');
        this.setRate(0);
        this.getListReview();
        // this._review.listReview(`?movie=${this.id}`).subscribe(data => {
        //   this.listReviews = data;
        //   console.log("list reviews!!!!")
        //   console.log(this.listReviews);
        //   let rate = 0;
        //   let sumReviewThisMovie = this.listReviews.length;
        //   console.log("length = " + sumReviewThisMovie);
        //   for (let result of this.listReviews) {
        //     console.log(result.rate);
        //     rate += result.rate;
        //   };
        //   console.log("rate = " + rate);
        //   let movieUpdate = {
        //     title: this.movie.title,
        //     year: this.movie.year,
        //     imdb: this.movie.imdb,
        //     type: this.movie.type,
        //     view: this.movie.view,
        //     intro: this.movie.intro,
        //     rate: _.ceil(rate / sumReviewThisMovie, 2),
        //     country: this.movie.country,
        //     category: this.movie.category
        //   }
        //   console.log("movie update");
        //   console.log(movieUpdate);
        //   this._movie.updateMovie(this.id, movieUpdate).subscribe(data => {
        //     if (!data.err) {
        //       console.log("UPDATE RATE SUCCESS!");
        //     }
        //     else {
        //       console.log("update movie fail")
        //     }
        //   })
        //   this._toastr.success('Review success!', 'Success!');
        //   // console.log(data);
        // })
      }, err => {
        console.log(err)
      })
    }


    // if (this.isErr === false) {
    //   this._review.findUserMovie(this.idUser, this.id).subscribe(data => {
    //     //if user not review
    //     if (data.err) {
    //       this._review.createReview(this.reviewForm.value).subscribe(data => {
    //         this.reviewForm.controls['content'].patchValue('');
    //         this.setRate(0);
    //         this._review.listReview(`?movie=${this.id}`).subscribe(data => {
    //           this.listReviews = data;
    //           console.log("list reviews!!!!")
    //           console.log(this.listReviews);
    //           // update rate of movie just have reviewed
    //           let rate = 0;
    //           let sumReviewThisMovie = this.listReviews.length;
    //           console.log("length = " + sumReviewThisMovie);
    //           for (let result of this.listReviews) {
    //             console.log(result.rate);
    //             rate += result.rate;
    //           };
    //           console.log("rate = " + rate);
    //           let movieUpdate = {
    //             title: this.movie.title,
    //             year: this.movie.year,
    //             imdb: this.movie.imdb,
    //             type: this.movie.type,
    //             view: this.movie.view,
    //             intro: this.movie.intro,
    //             rate: _.ceil(rate / sumReviewThisMovie, 2),
    //             country: this.movie.country,
    //             category: this.movie.category
    //           }
    //           console.log("movie update");
    //           console.log(movieUpdate);
    //           // after create review -> excute again value rate of this movie
    //           this._movie.updateMovie(this.id, movieUpdate).subscribe(data => {
    //             if (!data.err) {
    //               console.log("UPDATE RATE SUCCESS!");
    //             }
    //             else {
    //               console.log("update movie fail")
    //             }
    //           })
    //           this._toastr.success('Review success!', 'Success!');
    //           // console.log(data);
    //         })
    //       })
    //     }
    //     else {
    //       // console.log(data)
    //       // console.log(data._id );
    //       this._review.updateReview(data._id, this.reviewForm.value).subscribe(review => {
    //         if (!review.err) {
    //           this.reviewForm.controls['content'].patchValue('');
    //           this.setRate(0);
    //           this._review.listReview(`?movie=${this.id}`).subscribe(data => {
    //             this.listReviews = data;
    //             console.log("list reviews!!!!")
    //             console.log(this.listReviews);
    //             // update rate of movie just have reviewed
    //             let rate = 0;
    //             let sumReviewThisMovie = this.listReviews.length;
    //             console.log("length = " + sumReviewThisMovie);
    //             for (let result of this.listReviews) {
    //               console.log(result.rate);
    //               rate += result.rate;
    //             };
    //             console.log("rate = " + rate);
    //             let movieUpdate = {
    //               title: this.movie.title,
    //               year: this.movie.year,
    //               imdb: this.movie.imdb,
    //               type: this.movie.type,
    //               view: this.movie.view,
    //               intro: this.movie.intro,
    //               rate: _.ceil(rate / sumReviewThisMovie, 2),
    //               country: this.movie.country,
    //               category: this.movie.category
    //             }
    //             console.log("movie update");
    //             console.log(movieUpdate);
    //             // after create review -> excute again value rate of this movie
    //             this._movie.updateMovie(this.id, movieUpdate).subscribe(data => {
    //               if (!data.err) {
    //                 console.log("UPDATE RATE SUCCESS!");
    //               }
    //               else {
    //                 console.log(data.err)
    //               }
    //             })
    //             // console.log(data);

    //           })
    //           this._toastr.success('Update review success!', 'Success!');
    //         }
    //         else {
    //           this._toastr.error(data.err, 'Error!');
    //         }
    //       })
    //     }
    //   }, err => {
    //     console.log(err)
    //   })
    // }
  }
}
