import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EvaluationModel} from '../../models/evaluation/evaluation.model';
import {Observable} from "rxjs";
import {AuthService} from '../auth-guard/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {

  // url = 'http://127.0.0.1:8000/class_management/evaluation/';
  url = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  CreateEvaluation(evaluation: EvaluationModel) {
    return this.http.post(this.url + '/class_management/evaluation/', evaluation, {headers: this.authService.httpHeaders});
  }

  DeleteEvaluation(id: number) {
    return this.http.delete(this.url + '/class_management/evaluation/' + id + '/', {headers: this.authService.httpHeaders});
  }

  GetAllEvaluation(): Observable<EvaluationModel[]> {
    return this.http.get<EvaluationModel[]>(this.url + '/class_management/evaluation/', {headers: this.authService.httpHeaders});
  }

  GetSingleEvaluation(id: number) {
    return this.http.get(this.url + '/class_management/evaluation/' + id + '/', {headers: this.authService.httpHeaders});
  }
}
