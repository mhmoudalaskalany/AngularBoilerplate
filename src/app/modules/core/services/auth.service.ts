import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { APIs } from './APIs';
import { map } from 'rxjs/operators';
import { DataService } from './shared';
import { Screen } from './models/Screen'
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: any;
  screens;

  constructor(
    private APIs: APIs,
    private service: DataService) {

    let token = localStorage.getItem('token');
    if (token) {
      let jwt = new JwtHelper();
      this.currentUser = jwt.decodeToken(token);
    }
  }

  login(credentials) {
    return this.service.post(this.APIs.init('Authentication').Authenticate, credentials).pipe(map(result => {
        if (result && result.token) {
          localStorage.setItem('token', result.token);
          localStorage.setItem('roles', JSON.stringify(result['role']));

          let jwt = new JwtHelper();
          this.currentUser = jwt.decodeToken(localStorage.getItem('token'));
          return true;
        }
        return false;
      }));
  }

  signUp(data) {
    return this.service.post(this.APIs.init('Users').addUser, data);
  }

  changepassword(data) {
    return this.service.post(this.APIs.init('Users').ChangePassword, data);
  }

  forgetPassword(data) {
    return this.service.get(this.APIs.init(`UserMangments/ForgetPassword/${data}`).customEndPoint);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUser = null;
  }

  isLoggedIn(token: string = 'token') {
    // return true if there is a valid not expired local storage named 'token'
    return tokenNotExpired(token);
  }

  hasRole(screenName: string, roleName: string): boolean {
    const screensAuthorities: Screen[] = JSON.parse(localStorage.getItem('ScreensAuthorities')) as Screen[];

    for (let item of screensAuthorities) {
      const roles = item.childernsWithPermission.filter(e => e.screenNameFl.toLowerCase() == screenName.toLowerCase());
      if (roles[0]) {
        // screen UserMangments doesn't have add button
        if (screenName == 'UserMangments' && roles[0]['add']) {
          roles[0]['add'] = false;
        }
        return roles[0][roleName];
      }
    }

    return false;
  }

  loadScreenAuthorities() {
    this.service.getList(this.APIs.init('UserMangments/GetScreensAuthorities').customEndPoint)
      .subscribe(result => {
        this.screens = result;
        localStorage.setItem('ScreensAuthorities', JSON.stringify(result));
      });
  }

}
