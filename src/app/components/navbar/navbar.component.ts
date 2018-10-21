import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  isLogin: boolean;
  setLogin: boolean;
  isLoginC: string;
  constructor(
    private loginSerice: LoginService,
    private router: Router
  ) {}
  ngOnInit() {
    this.loginSerice.getAuth().subscribe((res) => {
      if(res){
        this.isLogin = true;
        // this.router.navigate(['/home']);
      }else{
        this.isLogin = false;
      }
    });
  }

  logout(){
    this.loginSerice.logout();
  }
}