import { Injectable } from '@angular/core';
import { TeacherModel } from '../../models/teacher/teacher.model';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject, Subscription} from 'rxjs';
import {AuthService} from '../auth-guard/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  url = environment.url;
  teacherArray: TeacherModel[] = [];
  teacherSubject = new Subject<TeacherModel[]>();

  constructor(private http: HttpClient,
              public infoBull: MatSnackBar,
              private authService: AuthService) { }
  EmitTeacher() {
    this.teacherSubject.next(this.teacherArray);
  }

  CreateTeacher(teacher: TeacherModel) {
    return this.http.post(this.url + '/user/teacher/', teacher, {headers: this.authService.httpHeaders});
  }

  GetAllTeacher() {
    return this.http.get<TeacherModel[]>(this.url + '/user/teacher/', {headers: this.authService.httpHeaders});
  }

  GetAllTeacherArray() {
    return this.http.get<TeacherModel[]>(this.url + '/user/teacher/', {headers: this.authService.httpHeaders})
      .subscribe(
          (data) => {
            this.teacherArray = data;
            // console.log(this.teacherArray);
            this.EmitTeacher();
          }, (error => console.log(error))
        );
  }

  UpdateTeacher(teacherUpdated: TeacherModel, id: number): Observable<TeacherModel> {
    // tslint:disable-next-line:max-line-length
    return this.http.put<TeacherModel>(this.url + '/user/teacher/' + id + '/', teacherUpdated, {headers: this.authService.httpHeaders});
  }

  DeleteTeacher(id: number) {
    return this.http.delete(this.url + '/user/teacher/' + id + '/', {headers: this.authService.httpHeaders});
  }
}
