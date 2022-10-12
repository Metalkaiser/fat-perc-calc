import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LangsService {

  constructor() { }

  testfunc(){
    console.log("try");
  }

  eng = {
    "login":{
      "title":"Login",
      "user":"Email address",
      "password":"Password",
      "loginbtn":"Login"
    },
    "register":{
      "title":"Register new user",
      "undertitle":"If you still don't have an account in this app, you can register filling the formulary below",
      "user":"Email address",
      "password":"Password",
      "name":"Name",
      "lastname":"Lastname",
      "birthdate":"Birthdate",
      "gender":"Gender",
      "select":"Select your gender",
      "male":"Male",
      "female":"Female",
      "registerbtn":"Register",
      "success":"User registration successful"
    }
  }

  esp = {
    "login":{
      "title":"Iniciar sesión",
      "user":"Correo electrónico",
      "password":"Contraseña",
      "loginbtn":"Entrar"
    },
    "register":{
      "title":"Registrar nuevo usuario",
      "undertitle":"Si aún no tienes cuenta en esta aplicación, puedes registrarte llenando el formulario de abajo",
      "user":"Correo electrónico",
      "password":"Contraseña",
      "name":"Nombre",
      "lastname":"Apellido",
      "birthdate":"Fecha de nacimiento",
      "gender":"Género",
      "select":"Seleccione su género",
      "male":"Hombre",
      "female":"Mujer",
      "registerbtn":"Registrarse",
      "success":"Usuario exitosamente registrado"
    },
    "header":{
      "home":"Panel de control",
      "history":"Historial",
      "profile":"Perfil de usuario",
      "measure":"Medir grasa",
      "calories":"Calorías",
      "logout":"Salir",
      "help":"Ayuda"
    },
    "footer":{
      "copyright":"Juan Polanco. Todos los derechos reservados.",
      "github":"https://github.com/Metalkaiser/fat-perc-calc",
      "instagram":"https://www.instagram.com/metalkaiserp",
      "linkedin":"https://www.linkedin.com/in/metalkaiser-polanco/",
      "debrief1":"Aplicación para cálculo de porcentaje de grasa corporal.",
      "defrief2":"Realizada por Juan Polanco.",
      "debrief3":"Basada en NodeJS y Angular"
    }
  }
}
