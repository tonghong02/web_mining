import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';
import { ApiHeaderRequestService } from '../../services/api-header-request.service';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-phim-le',
  templateUrl: './phim-le.component.html',
  styleUrls: ['./phim-le.component.css']
})
export class PhimLeComponent implements OnInit {

  id: string = '';
  listHistorys: any;

  constructor(private _router: Router, private _history: HistoryService, private _auth: AuthenticationService, private _apiHeader: ApiHeaderRequestService) {

    this.id = this._auth.jwtDecode()._id;
  }

  ngOnInit() {
    this.getListHistory();
  }

  getListHistory() {
    this._history.listHistory(`?user=${this.id}`).subscribe(data => {
      this.listHistorys = data;
      console.log("list historyyyyyy");
      console.log(this.listHistorys);
    })
  }

  detailMovie(id: string){
    this._router.navigateByUrl(`/phim/${id}`);
  }

  createRange(number) {
    var items: number[] = [];
    for (var i = 1; i <= number; i++) {
      items.push(i);
    }
    return items;
  }

}
