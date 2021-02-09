import {Component, Inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth-guard/auth.service';
import {UserManagerService} from '../services/user/user-manager.service';

import jwt_decode from 'jwt-decode';
import {of, Subscription} from 'rxjs';
import {delay} from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  loginForm: FormGroup;
  error: any;
  bgVar: boolean;


  constructor(private formBuiler: FormBuilder,
              private authService: AuthService,
              private _snackBar: MatSnackBar,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.bgVar = localStorage.getItem('auth') === 'true' ? true : false;
    this.setBackgroundOrNot(!this.bgVar);
    this.LoginForm();
    this.authService.authentication.subscribe(
      (data) => {
        this.bgVar = data;
        this.setBackgroundOrNot(!this.bgVar);
      },
      (error) => { console.log(error); }
    );
  }

  LoginForm() {
    this.loginForm = this.formBuiler.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
  }

  onSubmit() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;

    if (this.loginForm.invalid) { return; }

    // console.log(username + ',' + password);

    this.authService.login(username, password);

    // chech if there is an error with login credentials
    this.authService.loginError.subscribe(
      (data) => {
         if (data) {
          const message = 'Username or password is wrong !';
          this._snackBar.open(message, 'Close', {
            duration: 4000,
          });
      }
    }
    );
    console.log(this.authService.loginError);
  }

  // If i didn't log in set the background else remove
  setBackgroundOrNot(bool: boolean) {
    if (bool) {
      // console.log('yiy');
      this.document.body.classList.add('my-class');
    } else {
      // console.log('yo');
      this.document.body.classList.remove('my-class');
    }
  }
}
