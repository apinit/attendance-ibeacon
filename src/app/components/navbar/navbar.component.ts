import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/login/login.service';
import { AngularFireAuth } from 'angularfire2/auth';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  isLogin: boolean;
  constructor(
    private loginSerice: LoginService,
    private auth: AngularFireAuth

  ) {
  }
  ngOnInit() {
    this.auth.authState.subscribe((auth) => {
      if(auth){
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }
    });
    // this.loginSerice.getAuth().subscribe((auth) => {
    //   if(auth){
    //     this.isLogin = true;
    //   }else{
    //     this.isLogin = false;
    //   }
    // });
  }

  logout(){
    this.loginSerice.logout();
  }
}
