import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
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
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService : AuthService,
              private tokenService : TokenService,
              private router : Router) {
  }

  ngOnInit(): void {
  }

  login() {
    if(this.loginForm.valid){
      this.authService.login(
        this.loginForm.get('email')!.value,
        this.loginForm.get('password')!.value
      ).subscribe(data => {
        this.tokenService.saveToken(data.jwttoken)
        this.router.navigate(['/user'])
      });
    }else{
      this.validateAllFormFields(this.loginForm)
    }
  }

  signUp(){
      this.router.navigate(['/sign-up'])
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field),
    };
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
