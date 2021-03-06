import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService {

  authState = null;
  constructor(
    private auth: AngularFireAuth
  ) {
    this.auth.authState.subscribe((auth) => {
      this.authState = auth;
    });
  }

  get authenticated(): boolean{
    return this.authState !== null;
  }
  get authLogout(): boolean{
    return this.authState == null;
  }
}
