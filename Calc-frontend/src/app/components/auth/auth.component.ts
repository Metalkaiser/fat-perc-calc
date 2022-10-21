import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import Swal from 'sweetalert2';

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
          Swal.fire({
            title:'Usuario registrado',
            icon:'success',
            text:'Ya puede iniciar sesión con su nueva cuenta',
            confirmButtonColor:'#17a2b8'
          });
          this.registerForm.reset();
        }else if (this.res[0] == 'emptyfields') {
          Swal.fire({
            title:'Error',
            icon:'error',
            text:'Llene todos los campos requeridos',
            confirmButtonColor:'#17a2b8',
            allowOutsideClick:false,
            allowEscapeKey:false,
          })
        } else {
          Swal.fire({
            title:'Error',
            icon:'error',
            text:'Ya hay un usuario registrado con ese correo',
            confirmButtonColor:'#17a2b8',
            allowOutsideClick:false,
            allowEscapeKey:false,
          })
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
          Swal.fire({
            title:'Error',
            icon:'error',
            text:'Asegúrese de haber ingresado correctamente su correo y contraseña',
            confirmButtonColor:'#17a2b8',
            allowOutsideClick:false,
            allowEscapeKey:false,
          })
        }
      },
      error => console.log(error)
    );
  }

  showRegister(): void {
    (<HTMLInputElement>document.getElementById("login")).style.display = 'none';
    (<HTMLInputElement>document.getElementById("register")).style.display = 'block';
    (<HTMLInputElement>document.getElementById("register")).className = 'col-lg-6 animate';
    (<HTMLInputElement>document.getElementById("login")).className = 'col-lg-6';
  }

  showLogin(): void {
    (<HTMLInputElement>document.getElementById("register")).style.display = 'none';
    (<HTMLInputElement>document.getElementById("login")).style.display = 'block';
    (<HTMLInputElement>document.getElementById("login")).className = 'col-lg-6 animate';
    (<HTMLInputElement>document.getElementById("register")).className = 'col-lg-6';
  }

}
