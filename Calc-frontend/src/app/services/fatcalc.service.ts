import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FatcalcService {

  constructor(private httpClient:HttpClient) { }

  calculate(datos:any){
    return this.httpClient.post('http://localhost:3000/fat',datos,{withCredentials:true});
  }

  calories(datos:any){
    return this.httpClient.post('http://localhost:3000/diet',datos,{withCredentials:true});
  }
}
