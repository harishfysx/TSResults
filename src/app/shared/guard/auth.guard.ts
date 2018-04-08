import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn = false;
    constructor(private router: Router,
                private authService: AuthService ) { }
  /*  canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      console.log('firing canActivate')
      return Observable.create((observer) => {
        this.authService.isAuthenticated().subscribe((value) => {
          console.log('isAuhtenitcated', value);
          if (value) {
            return true;
          } else {
            this.router.navigate(['/lghgfhgf']);
            console.log('returing false');
            return false;
          }
        });
      });
    }*/

  canActivate() {
      this.authService.isAuthenticated().subscribe((value) => {
        this.isLoggedIn = value;
    });
    if (this.isLoggedIn) {
      return true;
    }
    this.router.navigate(['/landing/signin']);
    return false;
  }
}
