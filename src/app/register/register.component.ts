import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ApiService} from '../shared/services/api.service';
import {User} from '../shared/models/models';
import {AuthService} from '../shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    email: new FormControl(''),
    name: new FormControl('')
  });


  constructor(
    private provider: ApiService,
    private authService: AuthService
  ) { }

  register() {
    var username = this.form.value.username
    var password = this.form.value.password
    var email = this.form.value.email
    var name = this.form.value.name

    var user: User = {
      id: 0,
      username: username,
      password: password,
      email: email,
      name: name,
      albums: null,
    }
    this.provider.register(user).then(res => {
      this.authService.currentUser = res
      this.authService.auth(res.username, res.password)
    })
  }

}
