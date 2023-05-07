import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrencyService} from "./currency.service";
import {SliderService} from "./slider.service";
import {environment} from "../../../environments/environment";
import {JwtResponse} from "../model/jwt-response";
import {TokenService} from "./token.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly backendUrl : string

  private jwtHelper = new JwtHelperService()


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

  login(email : string, password : string){
    const queryParams = "?email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':''
    })
    const options = {headers: headers}

    return this.http.post<JwtResponse>(this.backendUrl + '/v1/Customers/login' + queryParams,{},options);
  }

  isLoggedIn() : Boolean{
    const token = this.tokenService.getToken()
    if (token == '' || this.jwtHelper.isTokenExpired(token)){
      console.log("no valid token found!")
      return false
    }else {
      return true
    }
  }
}
