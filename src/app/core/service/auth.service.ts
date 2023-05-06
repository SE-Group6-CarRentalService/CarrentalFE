import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {LoginDto} from "../model/login-dto";
import {AuthenticationDto} from "../model/authentication-dto";
import {Observable} from "rxjs";
import {CurrencyService} from "./currency.service";
import {SliderService} from "./slider.service";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly backendUrl : string


  constructor(private http : HttpClient,private currencyService : CurrencyService, private sliderService : SliderService) {
    if(this.sliderService.get()){
      this.backendUrl = environment.backendUrlPart2
    }else {
      this.backendUrl = environment.backendUrlPart1
    }

  }

  login(email : string, password : string){
    const queryParams = "?email=" + encodeURIComponent(email) + "&password=" + encodeURIComponent(password)
    return this.http.post<String>(this.backendUrl + '/v1/customers/login' + queryParams,{});
  }

  isLoggedIn() : Boolean{
    return false;
  }
}
