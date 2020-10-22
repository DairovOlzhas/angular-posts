import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from './shared/services/auth.service';
import {User} from './shared/models/models';
import set = Reflect.set;

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }

  async canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<true | UrlTree> {
    const url: string = state.url;

    return await this.checkLogin(url);
  }

  async checkLogin(
    url: string
  ): Promise<true | UrlTree> {
    if (localStorage.getItem('token')){
      await this.authService.getCurrentUser()
      if (this.authService.isLoggedIn) {
        return true;
      }
    }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Redirect to the login page
    return this.router.parseUrl('/start-page');
  }

}
