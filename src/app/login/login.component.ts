import {Component, OnInit} from '@angular/core';
import {ApiService} from '../shared/services/api.service';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  error: string | null = null

  constructor(
    private provider: ApiService,
    private authService: AuthService,
    private router: Router
  ) { }

  auth(): void{
    if (this.form.valid) {
      var b = this.authService.auth(this.form.value.username, this.form.value.password)
      if (!b) {
        this.error = 'Username or password invalid'
      } else {
        this.error = null
      }
    }
  }

}

