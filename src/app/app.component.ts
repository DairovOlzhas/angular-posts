import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSticky: boolean = false;

  constructor(private authService: AuthService) {
  }

}
