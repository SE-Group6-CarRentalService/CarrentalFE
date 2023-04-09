import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() { }

  set(currency : String){
    localStorage.setItem('currency', currency.toString())
  }

  get() : String{
    return localStorage.getItem('currency') != null ? localStorage.getItem('currency')! : 'USD'
  }
}
