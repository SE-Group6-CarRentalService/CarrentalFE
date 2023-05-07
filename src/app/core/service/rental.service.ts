import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CurrencyService} from "./currency.service";
import {SliderService} from "./slider.service";
import {TokenService} from "./token.service";
import {environment} from "../../../environments/environment";
import {RentalCheckout} from "../../model/RentalCheckout";
import {UserManagementService} from "./user-management.service";

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  private readonly backendUrl : string

  constructor(private http : HttpClient,
              private sliderService : SliderService,
              private tokenService : TokenService,
              private currencyService : CurrencyService,
              private userManagementService : UserManagementService) {
    if(this.sliderService.get()){
      this.backendUrl = environment.backendUrlPart2
    }else {
      this.backendUrl = environment.backendUrlPart1
    }

  }

  rentalCheckout(rentalCheckout : RentalCheckout){
    const token : string = this.tokenService.getToken()
    const queryParams = "?currency=" + this.currencyService.get()

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer ' + token
    })
    const options = {headers: headers}
    return this.http.post<RentalCheckout>(this.backendUrl + '/v1/rentals' + queryParams,rentalCheckout,options);
  }

  getRentals(){
    const token : string = this.tokenService.getToken()
    const customerId = this.userManagementService.getUser()
    const queryParams = "?currency=" + this.currencyService.get()

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer ' + token
    })
    const options = {headers: headers}
    return this.http.get<RentalCheckout[]>(this.backendUrl + '/v1/rentals/' + customerId + queryParams, options);


  }

  deleteRental(rentalId : number){
    const token : string = this.tokenService.getToken()

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer ' + token
    })
    const options = {headers: headers}
    return this.http.delete<RentalCheckout>(this.backendUrl + '/v1/rentals/' + rentalId ,options);
  }

  returnRental(rentalId : number){
    const token : string = this.tokenService.getToken()

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'application/json',
      'Authorization':'Bearer ' + token
    })
    const options = {headers: headers}
    return this.http.put<RentalCheckout>(this.backendUrl + '/v1/rentals/' + rentalId ,{},options);
  }
}
