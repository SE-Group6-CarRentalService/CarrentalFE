import { Injectable } from '@angular/core';
import {CarOverview} from "../../model/CarOverview";
import {Cars} from "../../mockdata/mock-carlist";

@Injectable({
  providedIn: 'root'
})
export class CarListService {

  constructor() { }

  getCars() : CarOverview[]{
    return Cars
  }

  getCarLocations() : string{
    let carList = this.getCars()
    let carLocationString : string = ''

    carList.forEach( (car) => {
      carLocationString = carLocationString.concat(car.location, ',')
    })

    return carLocationString
  }

}
