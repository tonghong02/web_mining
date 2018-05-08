import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as _ from "lodash";


import { MovieService } from '../../services/movie.service';
import { AuthenticationService } from '../../services/authentication.service';
import { MovieModel } from '../../models/movie.model';
import { UserModel } from '../../models/user.model'

@Component({
  selector: 'app-phim-moi',
  templateUrl: './phim-moi.component.html',
  styleUrls: ['./phim-moi.component.css']
})
export class PhimMoiComponent implements OnInit {

  category: string = '';
  listMovies: any;

  constructor(private _movie: MovieService, private _route: ActivatedRoute, private _authentication: AuthenticationService) {
    this._route.params.subscribe(params => {
      this.category = params['category'];
      console.log("category = " + this.category);
      this._movie.getListMovie(`?category=${this.category}`).subscribe(data => {
        this.listMovies = data;
        console.log(this.listMovies)
      })
    });
  }

  ngOnInit() {
  }

}
