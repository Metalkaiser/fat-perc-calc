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

  constructor(private formBuilder: FormBuilder, private pruebaAuth:AuthserviceService) { }

  ngOnInit(): void {
  }

  onSubmitRegister(): void {
    console.log(this.registerForm.value);
    //this.registerForm.reset();
  }

  onSubmitLogin(): void {
    //console.log(this.loginForm.value);
    this.pruebaAuth.pruebaApi(this.loginForm.value);
    //this.loginForm.reset();
  }

}
