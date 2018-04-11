import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, ResponseOptions, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

//
import { AuthenticationService } from '../../services/authentication.service';
import { ApiHeaderRequestService } from '../../services/api-header-request.service';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _apiHeader: ApiHeaderRequestService, private fb: FormBuilder, private _router: Router, private _toastr: ToastrService, private _test: TestService, private _authentication: AuthenticationService) {
    this.loginForm = this.fb.group({
      password: ['123456'],
      username: ['hong04'],
    });
  }

  ngOnInit() {
    console.log("hahahah")
    console.log(localStorage.getItem('token'))

  }

  onSubmit() {
    console.log("sumited");
    this._apiHeader.get(`/movie`).subscribe(data => {
      console.log(data);
    })

    this._authentication.authenticate(this.loginForm.value).subscribe(data => {
      console.log(data);
      if (data.success) {
        this._toastr.success('Success!', 'Login success!');
        // this._router.navigate(['/home']);
        this._authentication.setUserInfo(data);
        localStorage.setItem('token', data.token);
      }
      else {
        this._toastr.error('Error!', 'Login fail!');
      }

    }, err => {
      this._toastr.error('Error!', 'Login fail!');
    })
  }

  logout() {
    this._authentication.logout();
  }
}
