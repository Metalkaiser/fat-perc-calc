import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private httpClient:HttpClient) { }

  login(solicitud:any) {
    return this.httpClient.post(
      'http://localhost:3000/login',
      solicitud,
      {
      withCredentials:true
    });
  }

  register(solicitud:any){
    return this.httpClient.post('http://localhost:3000/register',solicitud);
  }

  dashboard(){
    return this.httpClient.get('http://localhost:3000',{withCredentials:true});
  }
}
