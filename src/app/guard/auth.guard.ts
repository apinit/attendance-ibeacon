import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { LoginService } from '../shared/login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private loginService: LoginService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.loginService.afAuth.authState
      .take(1)
      .map(authState => !! authState)
      .do( authenticated => {
         if (!authenticated) {
           this.router.navigate(['/login']);
         }
      });
    }
}
