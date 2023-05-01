import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  constructor() { }

  set(slider : boolean){
    localStorage.setItem('project', JSON.stringify(slider))
  }

  get() : boolean{
    return localStorage.getItem('project') != null ? JSON.parse(localStorage.getItem('project')!) : false
  }
}
