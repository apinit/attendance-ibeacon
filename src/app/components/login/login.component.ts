import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../shared/login/login.service';
import { User } from '../../shared/models';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  loginForm: FormGroup;

  constructor(
    private loginSerive: LoginService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms(){
    this.loginForm = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ])]
    });
  }
  onSubmit(){
    this.loginSerive.login(this.user);
  }
}
