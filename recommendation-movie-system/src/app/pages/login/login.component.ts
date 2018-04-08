import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Http, Headers, RequestOptions, ResponseOptions, Response } from '@angular/http';
import { ToastrService } from 'ngx-toastr';

//
import { AuthenticationService } from '../../services/authentication.service';
import { TestService } from '../../services/test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private _router: Router, private _toastr: ToastrService, private _test: TestService , private _authentication: AuthenticationService) {
    this.loginForm = this.fb.group({
      email: ['tonghong02@gmail.com'],
      password: ['123456'],
      name: ['hong04'],
      admin: ["true"]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log("sumited");
    // this._test.getUser().subscribe(data => {
    //   console.log(data);
    // })
    let a:Number = 2;

    this._authentication.authenticate(this.loginForm.value)
    .then(data => {
      // this._toastr.success('success', 'Login success');
      localStorage.setItem('token', data);
      this._router.navigate(['/home']);
  })
  .catch(err => {
      // this._toastr.error('error', 'Login fail');
  });
    // console.log( this._authentication.authenticate(this.loginForm.value))
    // if(data){
    //   this._toastr.success('success', 'Login success');
    //     localStorage.setItem('token', data);
    //     this._router.navigate(['/home']);
    // }
    // else{
    //   this._toastr.error('error', 'Login fail');
    // }
  }

  logout(){
    this._authentication.logout();
  }
}
