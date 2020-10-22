import {Injectable} from '@angular/core';
import {MainService} from './main.service';
import {User} from '../models/models';
import {ApiService} from './api.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends MainService {
  isLoggedIn = false;
  currentUser: User = {
    id: 0,
    username: '',
    name: '',
    password: '',
    email: '',
    albums: null
  };
  redirectUrl: string = '';

  constructor(
    protected http: HttpClient,
    private provider: ApiService,
    private router: Router
  ) {
    super(http);
  }

  async auth(login, pass): Promise<boolean> {
    var success: boolean;
    await this.post('http://127.0.0.1:3000/sign-in', {
      username: login,
      password: pass
    }).then(
      res => {
        localStorage.setItem('token', res.access_token);
        this.getCurrentUser();
        this.router.navigate([this.redirectUrl]);
        success = true
      },
      error => {
        success = false
        this.logout()
      }
    );
    return success;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.isLoggedIn = false;
    this.currentUser = {
      id: 0,
      username: '',
      name: '',
      password: '',
      email: '',
      albums: null

    };
  }

  async getCurrentUser() {
    return await this.http.get<User>(`http://127.0.0.1:3000/me`).toPromise().then(
      res => {
        this.currentUser = res;
        this.isLoggedIn = true;
      },
      error => {
        this.logout();
      }
    );
  }
}
