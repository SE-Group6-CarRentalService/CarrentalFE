import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {CurrencyService} from "./currency.service";
import {SliderService} from "./slider.service";
import {environment} from "../../../environments/environment";
import {UserRegistration} from "../../model/UserRegistration";
import {catchError, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  private readonly backendUrl : string

  constructor(private http : HttpClient,private currencyService : CurrencyService, private sliderService : SliderService) {
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
}
