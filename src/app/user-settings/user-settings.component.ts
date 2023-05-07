import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../core/service/auth.service";
import {UserManagementService} from "../core/service/user-management.service";
import {UserDetailsDto} from "../core/model/userDetails-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserRegistrationInput} from "../model/UserRegistrationInput";
import {UserRegistration} from "../model/UserRegistration";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private authService : AuthService,
              private userManagementService : UserManagementService) { }

  userDetails : UserDetailsDto = {
    address: "", birthdate: "", email: "", id: 0, name: "", passportNumber: "", password: "", paymentMethod: ""
  }

  changedUserInput : UserRegistrationInput = {
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

  userForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    passportId: new FormControl('',Validators.required),
    birthday: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    address2:new FormControl(''),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zip: new FormControl('',Validators.required),
  })


  ngOnInit(): void {
    if (this.authService.isLoggedIn()){
      this.userManagementService.getUserDetails().subscribe(data => {
        this.userDetails = data
        this.userForm.controls['firstName'].setValue(data.name.split(" ")[0])
        this.userForm.controls['lastName'].setValue(data.name.split(" ")[1])
        this.userForm.controls['passportId'].setValue(data.passportNumber)
        this.userForm.controls['email'].setValue(data.email)
        this.userForm.controls['country'].setValue(data.address.split(" ")[0])
        this.userForm.controls['address'].setValue(data.address.split(" ")[1] + " " + data.address.split(" ")[2])
        this.userForm.controls['zip'].setValue(data.address.split(" ")[3])
        this.userForm.controls['city'].setValue(data.address.split(" ")[4])
        this.userForm.controls['birthday'].setValue(data.birthdate)
        console.log(JSON.stringify(data))
      })

    }
  }

  changeUserData(){
    console.log("valid" + this.userForm.valid)
    console.log("dirty" + this.userForm.dirty)
    if(this.userForm.valid && this.userForm.dirty){
      console.log("Changes triggered")
      this.changedUserInput = this.userForm.value
      let changedUser : UserRegistration = {
        address: this.changedUserInput.country + " " + this.changedUserInput.address + " " + this.changedUserInput.zip + " " + this.changedUserInput.city,
        birthdate: this.changedUserInput.birthday,
        email: this.changedUserInput.email,
        id: 0,
        name: this.changedUserInput.firstName + " " + this.changedUserInput.lastName,
        passportNumber: this.changedUserInput.passportId,
        password: this.changedUserInput.password,
        paymentMethod: ""
      }
      this.userManagementService.changeUser(changedUser).subscribe()

    }else {
      this.validateAllFormFields(this.userForm)
    }
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !this.userForm.get(field).valid && this.userForm.get(field).touched;
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
