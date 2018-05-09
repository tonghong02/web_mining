import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  listMovies: any;
  search: string = '';

  constructor(private _movie: MovieService, private _route: ActivatedRoute, private _router: Router) {
    this._route.params.subscribe(params => {
      this.search = params['text'];
      this._movie.searchMovie(`?search=${this.search}`).subscribe(data => {
        this.listMovies = data;
      })
    });
  }

  ngOnInit() {
  }

  detailMovie(id: string){
    this._router.navigateByUrl(`/phim/${id}`);
  }


}
