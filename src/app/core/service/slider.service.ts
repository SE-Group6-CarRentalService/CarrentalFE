import { Injectable } from '@angular/core';
import {TokenService} from "./token.service";

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor() { }

  set(slider : boolean){
    localStorage.setItem('project', JSON.stringify(slider))
    localStorage.removeItem('token')
    localStorage.removeItem('customerId');
  }

  get() : boolean{
    return localStorage.getItem('project') != null ? JSON.parse(localStorage.getItem('project')!) : false
  }
}
