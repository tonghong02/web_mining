import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MovieService } from '../../../services/movie.service';
import { MovieModel } from '../../../models/movie.model';

@Component({
  selector: 'app-detail-review',
  templateUrl: './detail-review.component.html',
  styleUrls: ['./detail-review.component.css']
})
export class DetailReviewComponent implements OnInit {
  id: string = '';
  movie: MovieModel;

  constructor(private _movie: MovieService, private _route: ActivatedRoute) { 
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this._movie.detailMovie(this.id).subscribe(data => {
        this.movie = data;
        console.log("detail movie");
        console.log(this.movie);
      })
    });
  }

  ngOnInit() {
  }

}
