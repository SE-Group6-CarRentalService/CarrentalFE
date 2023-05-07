import { Component, OnInit } from '@angular/core';
import {CarOverview} from "../model/CarOverview";
import {ActivatedRoute} from "@angular/router";
import {CurrencyService} from "../core/service/currency.service";
import {Car} from "../mockdata/mock-carlist";
import {AuthService} from "../core/service/auth.service";
import {UserManagementService} from "../core/service/user-management.service";
import {UserDetailsDto} from "../core/model/userDetails-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RentalCheckout} from "../model/RentalCheckout";
import {RentalCheckoutInput} from "../model/RentalCheckoutInput";
import {RentalService} from "../core/service/rental.service";

@Component({
  selector: 'app-rental-checkout',
  templateUrl: './rental-checkout.component.html',
  styleUrls: ['./rental-checkout.component.css']
})
export class RentalCheckoutComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private currencyService : CurrencyService,
              private authService : AuthService,
              private userManagementService : UserManagementService,
              private rentalService : RentalService) { }

  securityDeposit : number = 0;
  rentedDays : number = 1;
  get currency() : String {
     return this.currencyService.get()
  }

  car : CarOverview = Car[0]

  userDetails : UserDetailsDto = {
    address: "", birthdate: "", email: "", id: 0, name: "", passportNumber: "", password: "", paymentMethod: ""
  }

  rentalCheckoutInput : RentalCheckoutInput = {
    address: "",
    address2: "",
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    passportId: "",
    rentalDuration: 0,
    zip: ""
  }


  checkoutForm = new FormGroup({
    rentalDuration: new FormControl(this.rentedDays, Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    passportId: new FormControl('',Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', Validators.required),
    address2:new FormControl(''),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    zip: new FormControl('',Validators.required),
  })


  ngOnInit(): void {
    this.route.queryParamMap.subscribe((queryParams) => {
      const serializedCar = queryParams.get('car');
      this.car = JSON.parse(decodeURIComponent(serializedCar!));
    })

    if (this.authService.isLoggedIn()){
      this.userManagementService.getUserDetails().subscribe(data => {
        this.userDetails = data
        this.checkoutForm.controls['firstName'].setValue(data.name.split(" ")[0])
        this.checkoutForm.controls['lastName'].setValue(data.name.split(" ")[1])
        this.checkoutForm.controls['passportId'].setValue(data.passportNumber)
        this.checkoutForm.controls['email'].setValue(data.email)
        this.checkoutForm.controls['country'].setValue(data.address.split(" ")[0])
        this.checkoutForm.controls['address'].setValue(data.address.split(" ")[1] + " " + data.address.split(" ")[2])
        this.checkoutForm.controls['zip'].setValue(data.address.split(" ")[3])
        this.checkoutForm.controls['city'].setValue(data.address.split(" ")[4])
        console.log(JSON.stringify(data))
      })

    }

    this.checkoutForm.get("rentalDuration")!.valueChanges.subscribe(selectedValue => {
      this.rentedDays = selectedValue
    })
  }

  calculateSecurityDeposit(costPerDay:number):number{
    const rate = 2
    this.securityDeposit = costPerDay * rate
    return this.securityDeposit
  }

  calculateTotal(costPerDay:number){
    return this.securityDeposit + costPerDay * this.rentedDays
  }

  checkout(){
    if(this.checkoutForm.valid){
      this.rentalCheckoutInput = this.checkoutForm.value
      let rentalCheckout : RentalCheckout = {
        carId: this.car.id,
        customerId: this.userDetails.id,
        id: 0,
        rentalDate: new Date(Date.now()).toDateString(),
        rentalDuration: this.rentalCheckoutInput.rentalDuration,
        rented: "true",
        returnDate: "",
        totalCost: this.calculateTotal(this.car.priceusd)
      }

      let response = this.rentalService.rentalCheckout(rentalCheckout).subscribe();
      console.log(response)

    }else {
      this.validateAllFormFields(this.checkoutForm)
    }
  }

  isFieldValid(field: string) {
    // @ts-ignore
    return !this.checkoutForm.get(field).valid && this.checkoutForm.get(field).touched;
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
