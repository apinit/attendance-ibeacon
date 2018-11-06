import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../shared/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';

@Injectable()
export class ProtectBackwardGuard implements CanActivate {
  authLogout: any = null;
  constructor(
    private authService: AuthService,
    private auth: AngularFireAuth,
    private router: Router
  ){
    this.auth.authState.subscribe((auth) => {
      if(auth){
        this.router.navigate(['/home']);
      }
      this.authLogout = auth;
    });
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(this.authService.authLogout){
        return true;
      }
      return false;
  }
}
