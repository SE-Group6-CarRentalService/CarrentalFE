import {Component} from '@angular/core';
import {Currency} from "./mockdata/mock-currencies";
import {CurrencyService} from "./core/service/currency.service";
import {SliderService} from "./core/service/slider.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarRentalFE';

  currency = Currency;

  sliderControl = new FormControl()

  sliderState : boolean = false
  storedCurrency : String = "USD"

  constructor(public currencyService : CurrencyService, public sliderService : SliderService) {}

  ngOnInit(){
    this.sliderState = this.sliderService.get()
    this.storedCurrency = this.currencyService.get()
  }

  setGlobalCurrency(selectedCurrency:String){
    this.currencyService.set(selectedCurrency)
  }

  setProjectPart(){
    this.sliderService.set(this.sliderControl.value)
  }
}
