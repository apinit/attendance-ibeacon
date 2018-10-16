import { Component, OnInit} from '@angular/core';
import { LoginService } from './shared/login/login.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private loginSerice: LoginService,
  ){}

  ngOnInit(){
    // this.loginSerice.logout();
  }
}
