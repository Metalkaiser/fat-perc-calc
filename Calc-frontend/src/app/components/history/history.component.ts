import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor(private httpClient:HttpClient) { }

  user:any;

  ngOnInit(): void {
    this.httpClient.get('http://localhost:3000/fat/history',{withCredentials:true})
    .subscribe(
      response => {
        this.user = Object.values(response)[2];
        console.log(Object.values(response)[2]);
      }
    );
  }

}
