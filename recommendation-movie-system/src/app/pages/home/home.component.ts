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

  }

  getListMovie(){
    this._movie.getListMovie(``).subscribe(data => {
      this.listMovies = data;
      console.log(this.listMovies);
    })
  }

  detailMovie(id: string){
    this._router.navigateByUrl(`/phim/${id}`);
  }

}
