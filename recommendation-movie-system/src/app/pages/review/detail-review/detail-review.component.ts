import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as _ from "lodash";

import { MovieService } from '../../../services/movie.service';
import { ReviewService } from '../../../services/review.service';
import { HistoryService } from '../../../services/history.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { MovieModel } from '../../../models/movie.model';
import { UserModel } from '../../../models/user.model'
import { PaginationService } from '../../../services/pagination.service';

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
  thisYear: string;
  mesRate: string = '';
  mesContent: string = '';
  isErr = false;
  listReviews: any;
  idUser: string = '';
  suggestItems: any;
  view: number = 0;
  rate: any;
  pagedItems:any;
  allItems: any;
  // pager object
  pager: any = {};
  pageSize: number = 3;
  src1: string = 'assets/images/star.png';
  src2: string = 'assets/images/star.png';
  src3: string = 'assets/images/star.png';
  src4: string = 'assets/images/star.png';
  src5: string = 'assets/images/star.png';

  constructor(private fb: FormBuilder,  private _pagination: PaginationService, private _toastr: ToastrService, private _movie: MovieService, private _route: ActivatedRoute, private _router: Router, private _authentication: AuthenticationService, private _review: ReviewService, private _history: HistoryService) {
    this._route.params.subscribe(params => {
      this.engTitle = this.normalizeTitle(params['engTitle']);
      console.log("name english: " + this.engTitle);
      let category: string = '';
      this._movie.detailMovie(this.engTitle).subscribe(data => {
        this.movie = data[0];
        this.view = data[0].view;
        console.log("rate: " + data[0].rate)
        data[0].rate === 'undefined' ? this.rate = 0 : this.rate = data[0].rate;
        this.thisYear = data[0].year;
        console.log('year = ' + this.thisYear);

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
        // 
        this._movie.getListMovie(`?year=${this.thisYear}&category=${data[0].category.split(',')[0]}`).subscribe(data => {
          console.log("year");
          console.log(data[0].view);
          for (let i = 0; i < data.length; i++) {
            if (data[i]._id == this.movie._id) {
              console.log('yes');
              data.splice(i, 1);
              break;
            } else {
              console.log('no');
            }
          }
          let listView = []
          let arrRecomend = []
          for (let i = 0; i < data.length; i++) {
            listView.push(data[i].view);
          }
          for (let i = 0; i < 3; i++) {
            arrRecomend.push(data[listView.indexOf(Math.max.apply(Math, listView))]);
            listView[listView.indexOf(Math.max.apply(Math, listView))] = -1;
          }
          this.suggestItems = arrRecomend;
        });
        //
        this.getListReview();
        // 
      });

    });

    if (this._authentication.getToken()) {
      this.isLogin = true;
      if (this._authentication.jwtDecode) {
        this.currentUser = this._authentication.jwtDecode();
        this.idUser = this.currentUser._id;
        console.log("current user")
        console.log(this.currentUser);
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
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
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
    this.view += 1;

    // increase view of movie
    this._movie.detailMovie(this.engTitle).subscribe(data => {
      if (data.length !== 0) {
        for (let i = 0; i < data.length; i++) {
          // update view for movie
          let movieUpdate = {
            title: this.movie.title,
            year: this.movie.year,
            imdb: this.movie.imdb,
            engTitle: this.engTitle,
            view: (typeof data[i].view != 'number') ? +data[i].view + 1 : data[i].view + 1,
            content: this.movie.content,
            rate: this.movie.rate,
            country: this.movie.country,
            category: data[i].category,
            linkWatch: this.movie.linkWatch,
            linkBackgrounds: this.movie.linkBackgrounds,
            linkPhim: this.movie.linkPhim,
          }
          console.log("movie update");
          console.log(movieUpdate);
          this._movie.updateMovie(data[i]._id, movieUpdate).subscribe(data => {
            if (!data.err) {
              console.log("UPDATE VIEW SUCCESS!");
              console.log(data)
            }
            else {
              console.log("update movie fail")
            }
          })
        }
      }
    }, err => {
      console.log(err)
    })
    // add movie into history
    let body = {
      user: this.idUser,
      movie: this.movie._id,
      titleMovie: this.engTitle
    }
    console.log("body")
    console.log(body)
    this._review.findUserMovie(this.idUser, this.engTitle).subscribe(data => {
      if (!data) {
        this._history.createHistory(body).subscribe(data => {
          console.log("create history");
          console.log(data);
        }, err => {
          console.log(err);
        })
      }
    })


  }

  getListReview() {
    this._review.listReview(`?movie=${this.engTitle}`).subscribe(data => {
      this.listReviews = data;
      this.allItems = data;
      console.log("list reviews!!!!")
      console.log(this.listReviews);
      this.setPage(1);
    }, err => {
      console.log(err)
    })
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this._pagination.getPager(this.allItems.length, page, this.pageSize);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
      this._review.findUserMovie(this.idUser, this.engTitle).subscribe(data => {
        //if not review
        if (!data) {
          this._review.createReview(this.reviewForm.value).subscribe(data => {
            console.log("created review successfully!!!")
            this.reviewForm.controls['content'].patchValue('');
            this.setRate(0);

            this._review.listReview(`?movie=${this.engTitle}`).subscribe(data => {
              this.listReviews = data;
              console.log("list reviews!!!!")
              console.log(this.listReviews);
              // calculate rate of movie
              let rate = 0;
              let sumReviewThisMovie = this.listReviews.length;
              console.log("length = " + sumReviewThisMovie);
              for (let result of this.listReviews) {
                console.log(result.rate);
                rate += result.rate;
              };
              console.log("rate = " + rate);
              this.rate = _.ceil(rate / sumReviewThisMovie, 2);

              this._movie.detailMovie(this.engTitle).subscribe(data => {
                //if have move -> update movie
                if (data.length !== 0) {
                  for (let i = 0; i < data.length; i++) {
                    // update rate for movie
                    let movieUpdate = {
                      title: this.movie.title,
                      year: this.movie.year,
                      imdb: this.movie.imdb,
                      engTitle: this.engTitle,
                      view: this.movie.view,
                      content: this.movie.content,
                      rate: _.ceil(rate / sumReviewThisMovie, 2),
                      country: this.movie.country,
                      category: data[i].category,
                      linkWatch: this.movie.linkWatch,
                      linkBackgrounds: this.movie.linkBackgrounds,
                      linkPhim: this.movie.linkPhim,
                    }
                    console.log("movie update");
                    console.log(movieUpdate);
                    this._movie.updateMovie(data[i]._id, movieUpdate).subscribe(data => {
                      if (!data.err) {
                        console.log("UPDATE RATE SUCCESS!");
                        this._toastr.success('Create review success!', 'Success!');
                      }
                      else {
                        console.log("update movie fail")
                      }
                    })
                  }
                }
              }, err => {
                console.log(err)
              })
            }, err => {
              console.log(err)
            })

          })
        } else {
          // update review
          this._review.updateReview(data._id, this.reviewForm.value).subscribe(data => {
            console.log("update review successfully!!!")
            this.reviewForm.controls['content'].patchValue('');
            this.setRate(0);

            this._review.listReview(`?movie=${this.engTitle}`).subscribe(data => {
              this.listReviews = data;
              console.log("list reviews!!!!")
              console.log(this.listReviews);
              // calculate rate of movie
              let rate = 0;
              let sumReviewThisMovie = this.listReviews.length;
              console.log("length = " + sumReviewThisMovie);
              for (let result of this.listReviews) {
                console.log(result.rate);
                rate += result.rate;
              };
              console.log("rate = " + rate);
              this.rate = _.ceil(rate / sumReviewThisMovie, 2);

              this._movie.detailMovie(this.engTitle).subscribe(data => {
                //if have move -> update movie
                if (data.length !== 0) {
                  for (let i = 0; i < data.length; i++) {
                    console.log("category movie");
                    console.log(data[i].category);
                    // update rate for movie
                    let movieUpdate = {
                      title: this.movie.title,
                      year: this.movie.year,
                      imdb: this.movie.imdb,
                      engTitle: this.engTitle,
                      view: this.movie.view,
                      content: this.movie.content,
                      rate: _.ceil(rate / sumReviewThisMovie, 2),
                      country: this.movie.country,
                      category: data[i].category,
                      linkWatch: this.movie.linkWatch,
                      linkBackgrounds: this.movie.linkBackgrounds,
                      linkPhim: this.movie.linkPhim,
                    }
                    console.log("movie update");
                    console.log(movieUpdate);
                    this._movie.updateMovie(data[i]._id, movieUpdate).subscribe(data => {
                      if (!data.err) {
                        console.log("UPDATE RATE SUCCESS!");
                        this._toastr.success('Update review success!', 'Success!');
                      }
                      else {
                        console.log("update movie fail")
                      }
                    })
                  }
                }
              }, err => {
                console.log(err)
              })
            }, err => {
              console.log(err)
            })

          })
        }
      }, err => {
        console.log(err)
      })
    }
  }

  detailMovie(title: string) {
    let engTitle = this.normalizeTitle(title);
    console.log("engTitle = " + engTitle);
    this._router.navigateByUrl(`/phim/${engTitle}`);
  }

}
