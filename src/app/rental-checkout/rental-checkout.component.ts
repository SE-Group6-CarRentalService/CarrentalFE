import { Component, OnInit } from '@angular/core';
import {CarOverview} from "../model/CarOverview";
import {ActivatedRoute} from "@angular/router";
import {CurrencyService} from "../core/service/currency.service";

@Component({
  selector: 'app-rental-checkout',
  templateUrl: './rental-checkout.component.html',
  styleUrls: ['./rental-checkout.component.css']
})
export class RentalCheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute, public currencyService : CurrencyService) { }

  securityDeposit : number = 0;
  rentedDays : number = 5;
  get currency() : String {
     return this.currencyService.get()
  }

  car : CarOverview = {
    acceleration: 0,
    automatic: false,
    cylinder: 0,
    fuel: "",
    horsepower: 0,
    id: 0,
    location: "",
    mileageKm: 0,
    modelName: "",
    origin: "",
    priceusd: 0,
    rentalId: "",
    weightInlbs: 0,
    year: ""

  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const serializedCar = queryParams.get('car');
      console.log(serializedCar)
      this.car = JSON.parse(decodeURIComponent(serializedCar!));
      console.log('Car:' + this.car);
    })
  }

  calculateSecurityDeposit(costPerDay:number):number{
    const rate = 5
    this.securityDeposit = costPerDay * rate
    return this.securityDeposit
  }

  calculateTotal(costPerDay:number){
    return this.securityDeposit + costPerDay * this.rentedDays
  }



}
