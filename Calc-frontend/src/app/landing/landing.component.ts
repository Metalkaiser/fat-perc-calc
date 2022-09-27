import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }

  cookie = false;

  ngOnInit(): void { 
    if (document.cookie == "") {
      this.cookie = false; 
    } else {
      this.cookie = true;
    }
   }

}
