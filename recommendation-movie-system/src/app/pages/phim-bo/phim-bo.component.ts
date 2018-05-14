import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import { MovieService } from '../../services/movie.service';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';
import { AuthenticationService } from '../../services/authentication.service';
import { MovieModel } from '../../models/movie.model';
import { UserModel } from '../../models/user.model'

@Component({
  selector: 'app-phim-bo',
  templateUrl: './phim-bo.component.html',
  styleUrls: ['./phim-bo.component.css']
})
export class PhimBoComponent implements OnInit {

  private allItems: any[];
  private allItemsDemo: any[];
  category: string = '';
  listMovies: any;

  // pager object
  pager: any = {};
  isLogin: boolean = false;
  currentUser: UserModel;
  idUser: string = '';
  engTitle: string = '';
  // paged items
  pagedItems: any[];
  constructor(
    private _movie: MovieService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pagination: PaginationService,
    private _authentication:AuthenticationService
  ) {
    this._route.params.subscribe(params => {
      this.category = params['category'];
      console.log("category = " + this.category);
      this.listContact();
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
  }

  ngOnInit() {
    console.log(this.normalizeTitle("how to do (sesion 3)"));
    this.testCheckReview();
  }

  listContact() {
    this._movie
      .getListMovie(`?category=${this.category}`)
      .subscribe(data => {
        console.log('dm');
        console.log(data);
        // set items to json response
        this.allItemsDemo = data;

        // initialize to page 1
        this.setPage(1);
      })
  }
  testCheckReview(){
    this._movie.testReview().subscribe(data => {
      console.log('data');
      console.log(data);
      this.allItems = this.allItemsDemo;
      console.log('this.idUser');
      console.log(this.idUser);
      
      let reviewDuplicate = [];
      let simArray = []
      let userSimArray = []
      let rateSimArray = []
      let movieSimArray = []
      let meanSimRate = []
      let meanRate = []
      let rateArray = data.rate;
      let userArray = data.idUser;
      let movieArray = data.idMovie;
      // tinh toan gia tri rating trung binh cho tung user
      for(let i = 0; i < rateArray.length;i++){
        let sum = 0;
        for(let j = 0; j<rateArray[i].length;j++){
          sum+=data.rate[i][j];
        }
        meanRate.push(sum/rateArray[i].length);
      }
      console.log('meanRate');
      console.log(meanRate);
      // xac dinh nguoi dung dang dang nhap trong mang rating tra ve
      let locateUserLoggedIn;
      for(let i = 0; i< userArray.length ; i++){
        if(userArray[i] == this.idUser){
          locateUserLoggedIn = i;
          break;
        }
      }
      let movieArrayThisUser = movieArray[locateUserLoggedIn];
      let rateArrayThisUser = rateArray[locateUserLoggedIn];
      console.log('locateUserLoggedIn');
      console.log(locateUserLoggedIn);
      console.log(movieArrayThisUser);
      console.log(rateArrayThisUser);
      
      for(let i = 0; i<rateArray.length; i++){
        let movieArrDuplicate = [];
        let rateArrDuplicate = [];
        console.log(rateArray[i]);
        console.log('rateArray[i]');
        if(i==locateUserLoggedIn){
          console.log('locateUserLoggedIn');
          console.log(i);
          continue;
        }else{

          for(let m = 0 ; m < movieArray[i].length ; m++){
            for(let n = 0 ; n < movieArrayThisUser.length ; n++){
              if(movieArray[i][m] == movieArrayThisUser[n]){
                console.log('trung nhau!!!');
                console.log(movieArrayThisUser[n]);
                movieArrDuplicate.push(movieArrayThisUser[n]);
                let thisReview = [];
                thisReview.push(data.rate[i][m]);
                thisReview.push(rateArrayThisUser[n]);
                rateArrDuplicate.push(thisReview);
              }
            }
          }
          console.log('determine the rating duplicate');
          console.log(movieArrDuplicate);
          console.log(rateArrDuplicate);
          let numerator = 0;
          let denominator1 = 0;
          let denominator2 = 0;
          for(let k = 0; k < rateArrDuplicate.length ; k++){
            numerator += (rateArrDuplicate[k][0] - meanRate[i])*(rateArrDuplicate[k][1] - meanRate[locateUserLoggedIn]);
            denominator1 += (rateArrDuplicate[k][0] - meanRate[i])*(rateArrDuplicate[k][0] - meanRate[i]);
            denominator2 += (rateArrDuplicate[k][1] - meanRate[locateUserLoggedIn]) * (rateArrDuplicate[k][1] - meanRate[locateUserLoggedIn]);
          }
          let sim = numerator/(Math.sqrt(denominator1)*Math.sqrt(denominator2));
          simArray.push(sim);
          userSimArray.push(userArray[i]);
          rateSimArray.push(rateArray[i]);
          movieSimArray.push(movieArray[i]);
          meanSimRate.push(meanRate[i]);
        }
      }
      let simArrayCopy = simArray;
      let locateMaxCorrelate = [];
      for(let i = 0; i<2;i++){
        let maxSim = Math.max.apply(Math,simArrayCopy);
        for(let j = 0; j<simArrayCopy.length; j++){
          if(simArrayCopy[j]== maxSim){
            locateMaxCorrelate.push(j);
            simArrayCopy[j] = -2;
          }
        }
      }
      let sumSim = 0;
      for(let j = 0; j<locateMaxCorrelate.length; j++){
        sumSim += simArray[locateMaxCorrelate[j]];
      }
      let pui = [];
      for(let i = 0; i< this.allItemsDemo.length ; i++){
        console.log(this.allItemsDemo[i]._id);
        console.log(meanRate[locateUserLoggedIn]);
        let ru = meanRate[locateUserLoggedIn];
        let numerator_p = 0
        for(let j = 0; j<locateMaxCorrelate.length; j++){
          for(let k = 0; k< movieSimArray[j].length; k++){
            if(this.allItemsDemo[i]._id == movieSimArray[j][k]){
              console.log('lol');
              numerator_p += simArray[locateMaxCorrelate[j]]*(rateSimArray[j][k]-meanSimRate[k]);
            }
          }
          
        }
        pui.push(ru+numerator_p/sumSim);
      }
      console.log('pui');
      console.log(pui);
      console.log('Max 5 correlate');
      console.log(locateMaxCorrelate);
      console.log('simArray');
      console.log(simArray);
      console.log('movieSimArray');
      console.log(movieSimArray);
      console.log('this.allItems');
      console.log(this.allItems);
    });
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
