import { Component, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private authServ:AuthserviceService) { }

  cookie = false;

  user: any[]  = [];

  ngOnInit(): void { 
    if (document.cookie == "") {
      this.cookie = false; 
    } else {
      this.cookie = true;
      this.authServ.dashboard().subscribe(
        response => {
          let currentItem = Object.values(response)
          this.user = [
            currentItem[0]
          ]

          console.log(currentItem[0])
        },
        error => console.log(error)
      )
    }
   }
}
