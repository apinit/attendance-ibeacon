import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
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
    private auth: AngularFireAuth,
    private authService: AuthService
  ) {
    this.auth.authState.subscribe((auth) => {
      if(!auth){
        this.router.navigate(['/login']);
      }
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean{
    
    if(this.authService.authenticated){
      return true;
    }
    return this.auth.authState
    .take(1)
    .map(authState => !!authState)
    .do( authenticated => {
        if (!authenticated) {
          this.router.navigate(['/login']);
        }
    });
  }
}
