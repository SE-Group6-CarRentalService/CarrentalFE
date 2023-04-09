import {Component} from '@angular/core';
import {Currency} from "./mockdata/mock-currencies";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CarRentalFE';

  currency = Currency;

  constructor() {
    localStorage.setItem("currency", "USD")
  }

  setGlobalCurrency(selectedCurrency:String){
    localStorage.setItem("currency", selectedCurrency.toString())
  }
}
