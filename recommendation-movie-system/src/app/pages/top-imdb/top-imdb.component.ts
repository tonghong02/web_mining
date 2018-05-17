import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { PaginationService } from '../../services/pagination.service';
import * as _ from 'underscore';
import { AuthenticationService } from '../../services/authentication.service';
import { MovieModel } from '../../models/movie.model';
import { UserModel } from '../../models/user.model'

@Component({
  selector: 'app-top-imdb',
  templateUrl: './top-imdb.component.html',
  styleUrls: ['./top-imdb.component.css']
})
export class TopImdbComponent implements OnInit {
  private allItems: any[];
  private allItemsDemo:any[];
  category: string = '';
  listMovies: any;

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  isLogin: boolean = false;
  currentUser: UserModel;
  idUser: string = '';
  engTitle: string = '';
  constructor(
    private _movie: MovieService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _pagination: PaginationService,
    private _authentication: AuthenticationService
  ) {
    if (this._authentication.getToken()) {
      this.isLogin = true;
      if (this._authentication.jwtDecode) {
        this.currentUser = this._authentication.jwtDecode();
        this.idUser = this.currentUser._id;
        console.log("current user")
        // console.log(this.currentUser);
      }
      console.log(this.currentUser);
      
    }

    if (this.isLogin === true) {
      this.recommendMovie();
    }
    else {
      console.log("view - category")
      this.listTopIMDB();
    }
  }

  ngOnInit() {
    
  }
  recommendMovie(){
    this._movie
      .topIMDB()
      .subscribe(data => {
        console.log(data);
        // set items to json response
        this.allItemsDemo = data;
      })
    console.log('recommendMovie current user!');
    console.log(this.currentUser);
    this._movie.testReview().subscribe(data => {
      // console.log('data');
      // console.log(data);
      // this.allItems = this.allItemsDemo;

      // console.log('this.idUser');
      // console.log(this.idUser);

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
      // Tinh rating trung binh cua tung nguoi dung
      for(let i = 0; i < rateArray.length;i++){
        let sum = 0;
        for (let j = 0; j < rateArray[i].length; j++) {
          sum += data.rate[i][j];
        }
        meanRate.push(sum / rateArray[i].length);
      }
      // console.log('meanRate');
      // console.log(meanRate);
      // xac dinh nguoi dung dang dang nhap trong mang rating tra ve
      let locateUserLoggedIn = -1;
      for (let i = 0; i < userArray.length; i++) {
        if (userArray[i] == this.idUser) {
          locateUserLoggedIn = i;
          break;
        }
      }
      // neu nguoi dung da tung danh gia truoc do, tinh toan goi y
      if (locateUserLoggedIn > -1) {
        let movieArrayThisUser = movieArray[locateUserLoggedIn];
        let rateArrayThisUser = rateArray[locateUserLoggedIn];
        // console.log('locateUserLoggedIn');
        // console.log(locateUserLoggedIn);
        // console.log(movieArrayThisUser);
        // console.log(rateArrayThisUser);


        for (let i = 0; i < rateArray.length; i++) {
          let movieArrDuplicate = [];
          let rateArrDuplicate = [];
          // console.log(rateArray[i]);
          // console.log('rateArray[i]');
          if (i == locateUserLoggedIn) {
            // console.log('locateUserLoggedIn');
            // console.log(i);
            continue;
          } else {

            for (let m = 0; m < movieArray[i].length; m++) {
              for (let n = 0; n < movieArrayThisUser.length; n++) {
                if (movieArray[i][m] == movieArrayThisUser[n]) {
                  // console.log('trung nhau!!!');
                  // console.log(movieArrayThisUser[n]);
                  movieArrDuplicate.push(movieArrayThisUser[n]);
                  let thisReview = [];
                  thisReview.push(data.rate[i][m]);
                  thisReview.push(rateArrayThisUser[n]);
                  rateArrDuplicate.push(thisReview);
                }
              }
            }
            // console.log('determine the rating duplicate');
            // console.log(movieArrDuplicate);
            // console.log(rateArrDuplicate);
            let numerator = 0;
            let denominator1 = 0;
            let denominator2 = 0;
            for (let k = 0; k < rateArrDuplicate.length; k++) {
              numerator += (rateArrDuplicate[k][0] - meanRate[i]) * (rateArrDuplicate[k][1] - meanRate[locateUserLoggedIn]);
              denominator1 += (rateArrDuplicate[k][0] - meanRate[i]) * (rateArrDuplicate[k][0] - meanRate[i]);
              denominator2 += (rateArrDuplicate[k][1] - meanRate[locateUserLoggedIn]) * (rateArrDuplicate[k][1] - meanRate[locateUserLoggedIn]);
              // console.log('denominator 1 = '+ denominator1);
              // console.log('denominator 2 = '+ denominator2);
            }
            let sim;
            if(isNaN(sim)==true){
              sim = 0;
            }
            else{
              sim = numerator/(Math.sqrt(denominator1)*Math.sqrt(denominator2));
            }  
            // khoang cach tu nguoi dung dang dang nhapj toi cac nguoi dung con lai
            simArray.push(sim);
            // console.log('simArray');
            // console.log(simArray);
            // Nhung nguoi dung khong phai nguoi dung dang dang nhap
            userSimArray.push(userArray[i]);
            rateSimArray.push(rateArray[i]);
            movieSimArray.push(movieArray[i]);
            meanSimRate.push(meanRate[i]);
          }
        }
        let simArrayCopy = simArray;
        // mang k nguoi dung gan nhat
        let locateMaxCorrelate = [];
        for (let i = 0; i < 5; i++) {
          let maxSim = Math.max.apply(Math, simArrayCopy);
          for (let j = 0; j < simArrayCopy.length; j++) {
            if (simArrayCopy[j] == maxSim) {
              locateMaxCorrelate.push(j);
              simArrayCopy[j] = -2;
              break;
            }
          }
        }
        let sumSim = 0;
        for (let j = 0; j < locateMaxCorrelate.length; j++) {
          sumSim += simArray[locateMaxCorrelate[j]];
        }
        let pui = [];
        // console.log('dm ver 3');
        // console.log(this.allItemsDemo);
        for (let i = 0; i < this.allItemsDemo.length; i++) {
          console.log(this.allItemsDemo[i]._id);
          console.log(meanRate[locateUserLoggedIn]);
          let ru = meanRate[locateUserLoggedIn];
          let numerator_p = 0
          for (let j = 0; j < locateMaxCorrelate.length; j++) {
            for (let k = 0; k < movieSimArray[j].length; k++) {
              if (this.allItemsDemo[i]._id == movieSimArray[j][k]) {
                // console.log('lol');
                numerator_p += simArray[locateMaxCorrelate[j]] * (rateSimArray[j][k] - meanSimRate[k]);
              }
            }

          }
          pui.push(ru + numerator_p / sumSim);
        }
        
        for(let i = 0; i<pui.length;i++){
          if(isNaN(pui[i])==true){
            pui[i]=meanRate[locateUserLoggedIn];
          }
        }
        console.log('pui');
        console.log(pui.length);
        console.log(pui);
        let arraySort = [];
        for (let i = 0; i < pui.length; i++) {
          for (let j = 0; j < pui.length; j++) {
            if (pui[j] == Math.max.apply(Math, pui)) {
              arraySort.push(j);
              pui[j] = -1;
              break;
            };
          }

          // let max = pui[i];
          // let locateMax = i;
          // for(let j = i+1; j<pui.length;j++){
          //   if(pui[j]>max){
          //     locateMax = j;
          //     max = pui[j];
          //   }
          //   if(j == pui.length-1){
          //     arraySort.push(locateMax);
          //     let swap = pui[locateMax];
          //     pui[locateMax] = pui[i];
          //     pui[i] = swap;
          //   }
          // }
        }
        let arr = [];
        for (let i = 0; i < arraySort.length; i++) {
          arr.push(this.allItemsDemo[arraySort[i]]);
        }
        this.allItems = arr;
        this.setPage(1);
        console.log('arraySort');
        console.log(arraySort);
        // console.log('pui');
        // console.log(pui);
        // console.log('Max 5 correlate');
        // console.log(locateMaxCorrelate);
        // console.log('simArray');
        // console.log(simArray);
        // console.log('movieSimArray');
        // console.log(movieSimArray);
        // console.log('this.allItems');
        // console.log(this.allItems);
      } else {
        // console.log('chua danh gia gi roi!');
        // neu chu danh gia thi tra ve danh sach ban dau
        this.allItems = this.allItemsDemo;
        this.setPage(1);
        // console.log('this.allItems');
        // console.log(this.allItems);
      }
    });
  }
  listTopIMDB() {
    this._movie
      .topIMDB()
      .subscribe(data => {
        console.log(data);
        // set items to json response
        this.allItemsDemo = data;
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
    return arr.join('_');
  }
}
