import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MovieService } from '../../services/movie.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listMovies: any;

  constructor(private _movie: MovieService, private _router: Router) { }

  ngOnInit() {
    this.getListMovie();
    console.log(this.normalizeTitle("the flash (season 4)"));
    console.log(this.normalizeTitlee(this.normalizeTitle("the flash (season 4)")))

  }

  normalizeTitlee(title: string){
    let arr = title.split("_");
    return arr.join(' ');
  }
  getListMovie() {
    this._movie.getListMovie(``).subscribe(data => {
      this.listMovies = data;
      console.log(this.listMovies);
    })
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
