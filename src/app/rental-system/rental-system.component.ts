import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {CurrencyService} from "../core/service/currency.service";
import {CarListService} from "../core/service/car-list.service";
import {CarOverview} from "../model/CarOverview";
import {RentalService} from "../core/service/rental.service";
import {RentalCheckout} from "../model/RentalCheckout";

@Component({
  selector: 'app-rental-system',
  templateUrl: './rental-system.component.html',
  styleUrls: ['./rental-system.component.css']
})
export class RentalSystemComponent implements OnInit {

  constructor(private currencyService : CurrencyService,
              private rentalService : RentalService,
              private carService : CarListService,
              private router : Router) { }

  rentalsReceived : RentalCheckout[] = [{
    carId: 0,
    customerId: 0,
    id: 0,
    rentalDate: "",
    rentalDuration: 0,
    rented: "",
    returnDate: "",
    totalCost: 0
  }]

  cars : CarOverview[] = [{
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
  }]

  allDataFetched : boolean = false;

  get currency() : String {
    return this.currencyService.get()
  }

  ngOnInit(): void {
    this.rentalService.getRentals().subscribe(rentalData => {
      this.rentalsReceived = rentalData
      for (let i = 0; i<this.rentalsReceived.length; i++){
        this.carService.getCar(this.rentalsReceived[i].carId).subscribe(car =>{
          this.cars[i] = car
          if (i = this.rentalsReceived.length){
            this.allDataFetched = true
          }
        })

      }
    })
  }

  delete(rental : RentalCheckout){
    this.rentalService.deleteRental(rental.id).subscribe(() => {
      this.router.navigate(['/rentals'])
    })
  }

  returnCar(rental : RentalCheckout){
    if (rental.rented == "true"){
      this.rentalService.returnRental(rental.id).subscribe(() => {
          this.router.navigate(['/rentals'])
      })
    }else{
      console.log("Car already returned")
    }
  }

}
