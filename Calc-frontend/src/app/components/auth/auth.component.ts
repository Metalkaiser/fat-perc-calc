import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  registerForm = this.formBuilder.group({
    username: '',
    password: '',
    name: '',
    lastname: '',
    birthdate: '',
    gender: ''
  });

  loginForm = this.formBuilder.group({
    username: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private authServ:AuthserviceService) { }

  ngOnInit(): void {
  }
  lang:any | undefined;
  res:any;

  onSubmitRegister(): void {
    this.authServ.register(this.registerForm.value).subscribe(
      response => {
        this.res = Object.values(response);
        if (this.res[0] == 'success') {
          console.log('User registered');
          this.registerForm.reset();
        }else if (this.res[0] == 'emptyfields') {
          console.log('Empty fields');
        } else {
          console.log('User exists');
        }
      },
      error => console.log(error)
    )
  }

  onSubmitLogin(): void {
    this.authServ.login(this.loginForm.value).subscribe(
      response => {
        this.res = Object.values(response);
        if (this.res[0] == true) {
          document.cookie="gender="+this.res[1].details.gender;
          document.cookie="theme="+this.res[1].profile.theme;
          document.cookie="lang="+this.res[1].profile.lang;
          window.location.reload();
        } else {
          console.log('login failed');
        }
      },
      error => console.log(error)
    );
  }

}
