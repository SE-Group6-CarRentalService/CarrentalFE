import {Component} from '@angular/core';
import {Currency} from "./mockdata/mock-currencies";
import {CurrencyService} from "./core/service/currency.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarRentalFE';

  currency = Currency;

  get startCurrency() : String {
    return this.currencyService.get()
  }

  constructor(public currencyService : CurrencyService) {}


  setGlobalCurrency(selectedCurrency:String){
    this.currencyService.set(selectedCurrency)
  }
}
