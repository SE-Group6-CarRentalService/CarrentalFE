import { Component, OnInit } from '@angular/core';
import {CarOverview} from "../model/CarOverview";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-rental-checkout',
  templateUrl: './rental-checkout.component.html',
  styleUrls: ['./rental-checkout.component.css']
})
export class RentalCheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  securityDeposit : number = 0;
  rentedDays : number = 5;
  currency : String = localStorage.getItem("currency") != null ? localStorage.getItem("currency")! : "USD";

  car : CarOverview = {
    automatic: false,
    fuel: "",
    mileage: 0,
    model: "",
    price: 0,
    rented : false
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
