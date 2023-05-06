import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/service/auth.service";
import {Router} from "@angular/router";
import {TokenService} from "../core/service/token.service";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  errorMessage = "";

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private fb:FormBuilder,
              private authService : AuthService,
              private tokenService : TokenService,
              private router : Router) {
  }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.invalid)
      return;


    let jwtToken = this.authService.login(
      this.loginForm.get('email')!.value,
      this.loginForm.get('password')!.value
    ).subscribe();

    console.log(jwtToken)
    }



    signUp(){
      this.router.navigate(['/sign-up'])
    }

}
