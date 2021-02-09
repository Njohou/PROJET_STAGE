import {Component, Inject, OnInit} from '@angular/core';
import {AuthService} from './services/auth-guard/auth.service';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {HttpHeaders} from '@angular/common/http';
import {DOCUMENT} from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'front-end-project';

  auth = false;
  bgVar = false;

  constructor(private authGuard: AuthGuardService, private authService: AuthService, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.auth = localStorage.getItem('auth') === 'true' ? true : false;
    this.bgVar = this.auth;
    this.authService.authentication.subscribe(
      (data) => {
        this.auth = data;
        this.bgVar = data;
        // console.log(this.bgVar);
        // set background if user is not logged in
        this.setBackgroundOrNot(!this.bgVar);
      }
    );

    // set header based on token received
    if (localStorage.getItem('token')) {
      this.authService.httpHeaders =
        new HttpHeaders({'Content-type': 'application/json', 'Authorization': 'JWT ' + localStorage.getItem('token')});
    }

    // console.log(this.auth);
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
