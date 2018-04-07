import { Component, OnInit } from '@angular/core';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private _test: TestService) { }
  // constructor(){}

  ngOnInit() {
    console.log("on init")
    this._test.getContact().subscribe(data => {
      console.log(data);
      console.log("haha")
    })
  }

}
