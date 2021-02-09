import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CourseModel} from '../../models/course/courses.model';
import {ChapterModel} from '../../models/chapter/chapters.model';
import {Observable} from 'rxjs';
import {AuthService} from '../auth-guard/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
// url = 'http://127.0.0.1:8000/class_management/chapter/';
  url = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  GetAllNotes(): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(this.url + '/class_management/chapter/');
  }
  GetSingleNote(id: number): Observable<ChapterModel> {
    return this.http.get<ChapterModel>(this.url + '/class_management/chapter/' + id + '/', {headers: this.authService.httpHeaders});
  }
  GetNotes(): Observable<ChapterModel[]> {
    return this.http.get<ChapterModel[]>(this.url + '/class_management/chapter/', {headers: this.authService.httpHeaders});
  }
  GetNote(id: number): Observable<ChapterModel> {
    return this.http.get<ChapterModel>(this.url + '/class_management/chapter/' + id + '/', {headers: this.authService.httpHeaders});
  }
  CreateNote(note: ChapterModel) {
    console.log(note);
    return this.http.post(this.url + '/class_management/chapter/', note, {headers: this.authService.httpHeaders});
  }
  DeleteNote(id: number) {
    return this.http.delete(this.url + '/class_management/chapter/' + id + '/', {headers: this.authService.httpHeaders});
  }
  UpdateNote(note: ChapterModel, id: number): Observable<ChapterModel> {
    return this.http.put<ChapterModel>(this.url + '/class_management/chapter/' + id + '/', note, {headers: this.authService.httpHeaders});
  }
}
