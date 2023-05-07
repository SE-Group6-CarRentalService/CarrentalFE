import { Injectable } from '@angular/core';
import {CarOverview} from "../../model/CarOverview";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {SliderService} from "./slider.service";
import {CurrencyService} from "./currency.service";

@Injectable({
  providedIn: 'root'
})
export class CarListService {

  private readonly backendUrl : string

  constructor(private http : HttpClient,private currencyService : CurrencyService, private sliderService : SliderService) {
    if(this.sliderService.get()){
      this.backendUrl = environment.backendUrlPart2
    }else {
      this.backendUrl = environment.backendUrlPart1
    }

  }



  getCars() : Observable<CarOverview[]>{
    let urlPath : string = "/v1/Cars"
    let parameterCurrency : string = "?currency=" + this.currencyService.get()
    console.log("UrlBackend: " + this.backendUrl)
    return this.http.get<CarOverview[]>(this.backendUrl + urlPath + parameterCurrency)
  }

  getCar(carId : number) : Observable<CarOverview>{
    let urlPath : string = "/v1/Cars/" + carId
    console.log("UrlBackend: " + this.backendUrl)
    return this.http.get<CarOverview>(this.backendUrl + urlPath)
  }

  getCarLocations() : Observable<string>{
    let carList : CarOverview[]
    let carLocationString : string = ''
    var subject = new Subject<string>();

    this.getCars().subscribe(carListData => {
      carList = carListData
      console.log(carList)

      carList.forEach( (car) => {
        carLocationString = carLocationString.concat(car.location, ',')
      })
      subject.next(carLocationString)
    })
    return subject.asObservable()
  }

}
