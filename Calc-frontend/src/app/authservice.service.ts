import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private httpClient:HttpClient) { }

  pruebaApi(solicitud:any) {
    this.httpClient.post(
      'http://localhost:3000/login',
      solicitud,
      {
      withCredentials:true
    }).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
  }
}
