import { Component, Input, OnInit } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() auth:boolean = false;

  constructor(private authServ:AuthserviceService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authServ.logout().subscribe(
      response => {
        console.log(Object.values(response)[0]);
        if (Object.values(response)[0]) {
          var cookies = document.cookie.split(";");

          for (var i = 0; i < cookies.length; i++) {
              var cookie = cookies[i];
              var eqPos = cookie.indexOf("=");
              var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
              document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
              console.log("Cookie borrada");
          }
        }
      }
    )
  }

}
