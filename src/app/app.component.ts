import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  constructor(
    private auth: AngularFireAuth
  ) {
    localStorage.removeItem('firebase:previous_websocket_failure');
    // this.auth.authState.subscribe((auth) => {
    //   console.log(auth);
    // });
  }
}
