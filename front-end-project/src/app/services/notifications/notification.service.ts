import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {NotificationGetModel} from '../../models/notification/notificationGet.model';
import {NotificationPostModel} from '../../models/notification/notificationPost.model';
import {AuthService} from '../auth-guard/auth.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // url = 'http://127.0.0.1:8000/class_management/notification/';
  url = environment.url;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getNotifications(): Observable<NotificationGetModel[]> {
    return this.http.get<NotificationGetModel[]>(this.url + '/class_management/notification/', {headers: this.authService.httpHeaders});
  }
  getNotification(id: number): Observable<NotificationGetModel> {
    return this.http.get<NotificationGetModel>(this.url + '/class_management/notification/' + id + '/', {headers: this.authService.httpHeaders});
  }
  postNotification(notification: NotificationPostModel) {
    return this.http.post(this.url + '/class_management/notification/', notification, {headers: this.authService.httpHeaders});
  }
  updateNotification(notification: NotificationGetModel) {
    return this.http.put<NotificationGetModel>(this.url + '/class_management/notification/' + notification.id + '/', notification, {headers: this.authService.httpHeaders});
  }
}
