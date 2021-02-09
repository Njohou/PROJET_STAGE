import {Injectable, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AudioModel} from '../../models/other/audio.model';
import {Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtherServiceService {
 // url = 'http://127.0.0.1:8000/audio/';
  url = environment.url;
  constructor(private http: HttpClient) { }

 ListenAudio(audio: AudioModel): Observable<any> {
    return this.http.post<any>(this.url + '/audio/', audio);
 }
}
