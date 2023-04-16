import {ElementRef, Injectable} from '@angular/core';
import {map, Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LocationMappingService {

  zoomFactor : number = 16;
  unsafeAPIkey:string = "yfr--erOVaPei09YBHKmGPmwpnrLmAmgMetHAgiX25Y";
  apiUrl:string = "https://image.maps.ls.hereapi.com/mia/1.6/mapview";
  width:number = 1000;
  height:number = 500;

  constructor(private http : HttpClient) {}

  getCarsLocation(pointsOfInterest:string, width?:number, height?:number):Observable<Blob>{
    if (typeof width != 'undefined'){
      this.width = width
    }
    if (typeof height != 'undefined'){
      this.height = height
    }

    const params = new HttpParams()
      .set('apiKey',this.unsafeAPIkey)
      .set('poi', pointsOfInterest)
      .set('z',this.zoomFactor)
      .set('w', this.width)
      .set('h', this.height)

    return this.http.get(this.apiUrl,{
      params,
      responseType: "blob"
    });
  }

  getCarLocationImage(coordinates:string, width?:number, height?:number):Observable<Blob>{
    if (typeof width != 'undefined'){
      this.width = width
    }
    if (typeof height != 'undefined'){
      this.height = height
    }

    const params = new HttpParams()
      .set('apiKey',this.unsafeAPIkey)
      .set('c', coordinates)
      .set('z',this.zoomFactor)
      .set('w', this.width)
      .set('h', this.height)

    return this.http.get(this.apiUrl,{
      params,
      responseType: "blob"
    });
  };
}
