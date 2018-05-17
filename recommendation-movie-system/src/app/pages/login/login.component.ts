import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, ResponseOptions, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

//
import { AuthenticationService } from '../../services/authentication.service';
import { ApiHeaderRequestService } from '../../services/api-header-request.service';
import { HeaderComponent } from '../../layout/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  err: boolean = false;
  mesUsername: string = '';
  mesPassword: string = '';

  constructor(private _apiHeader: ApiHeaderRequestService, private fb: FormBuilder, private _router: Router, private _toastr: ToastrService, private _authentication: AuthenticationService) {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {
    localStorage.removeItem('token');
    localStorage.removeItem('current_user');
  }

  onSubmit() {
    console.log("sumited");
    if (this.loginForm.controls.username.invalid) {
      this.mesUsername = 'Username is required!';
      this.err = true;
    }
    if (this.loginForm.controls.password.invalid) {
      this.mesPassword = 'Password is required!';
      this.err = true;
    }

    if (this.err === false) {
      this._authentication.authenticate(this.loginForm.value).subscribe(data => {
        console.log(data);
        if (data.success) {
          this._router.navigate(['/home']);
          this._toastr.success('Success!', 'Login success!');
          this._authentication.setUserInfo(data);
          localStorage.setItem('token', data.token);
          HeaderComponent.usernameLogin.next(data.user);
        }
        else {
          this._toastr.error('Error!', 'Login fail!');
        }
      }, err => {
        this._toastr.error('Error!', 'Login fail!');
      })
    }
  }
}
