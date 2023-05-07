import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrencyService} from "./currency.service";
import {SliderService} from "./slider.service";
import {environment} from "../../../environments/environment";
import {UserRegistration} from "../../model/UserRegistration";
import {TokenService} from "./token.service";
import {UserDetailsDto} from "../model/userDetails-dto";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private readonly backendUrl : string

  private key = "customerId";

  constructor(private http : HttpClient,
              private currencyService : CurrencyService,
              private sliderService : SliderService,
              private tokenService : TokenService) {
    if(this.sliderService.get()){
      this.backendUrl = environment.backendUrlPart2
    }else {
      this.backendUrl = environment.backendUrlPart1
    }

  }

  registerUser(userRegistration : UserRegistration){
    console.log("URL-Backend " + this.backendUrl)
    return this.http.post<UserRegistration>(this.backendUrl + "/v1/Customers/register",userRegistration)
  }

  saveUser(customerId : number){
    localStorage.setItem(this.key, customerId.toString());
  }

  getUserDetails(){
    const token : string = this.tokenService.getToken()
    const userId : number = this.getUser()
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer ' + token
    })
    const options = {headers: headers}

    return this.http.get<UserDetailsDto>(this.backendUrl + '/v1/Customers/' + userId,options);
  }

  getUser(): number {
    return Number(localStorage.getItem(this.key) ?? 0);
  }

  changeUser(user : UserRegistration){
    const token : string = this.tokenService.getToken()
    const userId : number = this.getUser()

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer ' + token
    })
    const options = {headers: headers}
    return this.http.put<UserRegistration>(this.backendUrl + '/v1/Customers/' + userId ,user,options);
  }
}
