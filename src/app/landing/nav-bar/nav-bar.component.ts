import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private authService: AuthService) { }

  ngOnInit() {
    const isAuthenticated = this.authService.isAuthenticated().subscribe((value) => {
      this.isLoggedIn = value;
    });
  }

}
