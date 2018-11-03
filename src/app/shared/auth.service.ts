import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable()
export class AuthService {

  authState: any;
  constructor(
    private auth: AngularFireAuth
  ) {
    auth.authState.subscribe((auth) => {
      this.authState = auth;
    })
  }

  get authenticated(){
    return this.authState !== null;
  }
}
