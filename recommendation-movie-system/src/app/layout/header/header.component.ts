import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';

import { AuthenticationService } from '../../services/authentication.service';
import { UserCanActive } from '../../services/authentication.service';
import { MovieService } from '../../services/movie.service';
import { SearchComponent } from '../../pages/search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public static usernameLogin: Subject<boolean> = new Subject();
  me: any;
  isLogin: boolean = false;
  search: string = '';
  currentUser: any;

  constructor(private _router: Router, private _authentication: AuthenticationService, private _userCanActive: UserCanActive, private _movie: MovieService) {


    if (this._authentication.getToken()) {
      this.isLogin = true;
      if (this._authentication.jwtDecode) {
        this.currentUser = this._authentication.jwtDecode();
        console.log("current user")
        console.log(this.currentUser);
      }
    }
    HeaderComponent.usernameLogin.subscribe(res => {
      this.isLogin = true;
      this.currentUser = res;
    })
    console.log(this.isLogin);
  }

  ngOnInit() {
  }

  onKey(value: string) {
    this.search = value;
    console.log(this.search);
  }

  searchMovie() {
    this._router.navigateByUrl(`/search/${this.search}`);
  }

  logout() {
    this._authentication.logout()
  }

}
