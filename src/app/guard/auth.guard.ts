import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../shared/auth.service';
@Injectable()
export class AuthGuard implements CanActivate{
  authen: boolean;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private authService: AuthService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean{
    if(this.authService.authenticated){
      return true;
    }
    return this.afAuth.authState
    .take(1)
    .map(authState => !!authState)
    .do( authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
    });
  }
}
