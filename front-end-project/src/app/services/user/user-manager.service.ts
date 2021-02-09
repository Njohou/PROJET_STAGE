import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import { environment } from '../../../environments/environment';

import {JwtHelperService} from '@auth0/angular-jwt';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagerService {

  // login_url = 'http://localhost:8000/auth/login/';
  url = environment.url;
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('an error occured: ', error.error.message);
    } else {
      console.log(error.error.non_field_errors);
    }
    return throwError ('Something bad happened; Please try again later.');
  }

  authenticate(username: string, password: string) {
    const data = { 'username': username, 'password': password };
    return this.http.post(this.url + '/auth/login/', data, this.options)
      .pipe(
        catchError(this.handleError)
      );
  }
}
