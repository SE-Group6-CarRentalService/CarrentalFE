import { Component, OnInit } from '@angular/core';
import {UserRegistrationInput} from "../model/UserRegistrationInput";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegistration} from "../model/UserRegistration";
import {UserManagementService} from "../core/service/user-management.service";

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit {

  signupForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    passportId: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    address2:new FormControl(''),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zip: new FormControl('',Validators.required),
    password: new FormControl('', Validators.required),
    birthday: new FormControl('', [Validators.required])

  })

  constructor(private userManagementService : UserManagementService) { }

  registrationInput : UserRegistrationInput = {
    password: "",
    zip: "",
    address: "",
    address2: "",
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    passportId: "",
    birthday:""
  }

  ngOnInit(): void {

  }

  signUp(){
    if(this.signupForm.valid){
      this.registrationInput = this.signupForm.value
      let userRegistration : UserRegistration = {
        address: this.registrationInput.country + " " + this.registrationInput.address + " " + this.registrationInput.zip + " " + this.registrationInput.city,
        birthdate: this.registrationInput.birthday,
        email: this.registrationInput.email,
        id: 0,
        name: this.registrationInput.firstName + " " + this.registrationInput.lastName,
        passportNumber: this.registrationInput.passportId,
        password: this.registrationInput.password,
        paymentMethod: ""
      }
      console.log(userRegistration)
      let returnCode = this.userManagementService.registerUser(userRegistration).subscribe()
      console.log(returnCode)

    }else {
      this.validateAllFormFields(this.signupForm)
    }
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !this.signupForm.get(field).valid && this.signupForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'is-invalid': this.isFieldValid(field),
    };
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }

}
