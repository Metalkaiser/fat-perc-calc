import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  constructor(private httpClient:HttpClient) { }

  url:string = 'http://localhost:3000';

  login(solicitud:any) {
    return this.httpClient.post(
      this.url + '/login',
      solicitud,
      {
      withCredentials:true
    });
  }

  register(solicitud:any){
    return this.httpClient.post(this.url + '/register',solicitud);
  }

  dashboard(){
    return this.httpClient.get(this.url + '',{withCredentials:true});
  }

  changePass(datos:any){
    return this.httpClient.patch(this.url + '/changepass',datos,{withCredentials:true});
  }

  changeProfile(datos:any){
    return this.httpClient.patch(this.url + '/changeprofile',datos,{withCredentials:true});
  }

  logout(){
    return this.httpClient.delete(this.url + '/logout',{withCredentials:true});
  }
}
