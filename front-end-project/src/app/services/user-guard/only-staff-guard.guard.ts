import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import {parseBool} from 'igniteui-angular-core';

@Injectable({
  providedIn: 'root'
})
export class OnlyStaffGuardGuard implements CanActivate {
  isAdmin = false;
  isStaff = false;
  isStudent = false;

  retrieveCredential() {
    this.isAdmin =  parseBool(localStorage.getItem('is_superuser'));
    this.isStaff =  parseBool(localStorage.getItem('is_staff'));
    this.isStudent =  parseBool(localStorage.getItem('is_active'));
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    this.retrieveCredential();
    if (this.isStaff && !this.isAdmin) {
      return true;
    }
    return false;
  }
}
