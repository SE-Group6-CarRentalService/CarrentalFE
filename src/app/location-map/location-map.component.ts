import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CarOverview} from "../model/CarOverview";
import {LocationMappingService} from "../core/service/locationMapping.service";
import {round} from "@popperjs/core/lib/utils/math";
import {CarListService} from "../core/service/car-list.service";

@Component({
  selector: 'app-location-map',
  templateUrl: './location-map.component.html',
  styleUrls: ['./location-map.component.css']
})
export class LocationMapComponent implements OnInit {

  constructor(private route: ActivatedRoute, private locationService : LocationMappingService, private carListService:CarListService) { }

  car : CarOverview = {
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

  }

  imageBlobUrl: string | ArrayBuffer | null = null;

  getCarLocationImage() : void{
    const width : number = round(window.innerWidth * 0.8)
    const height : number = round(window.innerHeight * 0.8)
    this.locationService.getCarLocationImage(this.car.location,width,height).subscribe(
      (val) => {
        this.createImageFromBlob(val);
      }
    )
  }

  getCarListLocationImage(cars : string) : void{
    const width : number = round(window.innerWidth * 0.8)
    const height : number = round(window.innerHeight * 0.8)
    this.locationService.getCarsLocation(cars,width,height).subscribe(
      (val) => {
        this.createImageFromBlob(val);
      }
    )
  }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe((queryParams) => {
      const serializedCar = queryParams.get('car');
      this.car = JSON.parse(decodeURIComponent(serializedCar!));

      if (this.car == null){
        console.log("All Location")
        let cars : string = ""
        this.carListService.getCarLocations().subscribe(
          (carLocations) => {
            cars = carLocations
            this.getCarListLocationImage(cars)
          }
        )

      }else {
        console.log("Car Location")
        this.getCarLocationImage()
      }
    })

  }



  private createImageFromBlob(image: Blob) {
    let reader = new FileReader()
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result
    }, false);

    if (image){
      reader.readAsDataURL(image)
    }
  }
}
