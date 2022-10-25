import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-configs',
  templateUrl: './configs.component.html',
  styleUrls: ['./configs.component.css']
})
export class ConfigsComponent implements OnInit {

  passForm = this.formBuilder.group({
    oldpass: '',
    newpass: '',
    passconf: ''
  });

  profileForm = this.formBuilder.group({
    lang: '',
    theme: ''
  });

  constructor(private formBuilder: FormBuilder, private authServ:AuthserviceService) { }

  ngOnInit(): void {
    this.authServ.dashboard().subscribe(
      response => console.log(response)
    );
  }

  changePass(){
    this.passForm.value.newpass == this.passForm.value.passconf ? 
      this.authServ.changePass(this.passForm.value)
      .subscribe(
        response => {
          if (Object.values(response)[0]) {
            Swal.fire({
              icon:'success',
              title: 'Contraseña cambiada',
              confirmButtonColor:'#17a2b8',
            });
            this.passForm.reset();
          } else {
            Swal.fire({
              icon:'error',
              title: 'No se pudo cambiar la contraseña',
              confirmButtonColor:'#17a2b8',
            });
          }
        }
      ) 
      : Swal.fire({
        icon: 'error',
        title: 'Las contraseñas no coinciden',
        confirmButtonColor:'#17a2b8',
      });
  }

  profile(){
    if (this.profileForm.value.lang == "" || this.profileForm.value.theme == "") {
      Swal.fire({
        icon: 'error',
        title: 'Seleccione todas las opciones correspondientes',
        confirmButtonColor:'#17a2b8',
      });
    }else {
      this.authServ.changeProfile(this.profileForm.value)
      .subscribe(
        response => Swal.fire({
          icon:'success',
          title:'Configuraciones cambiadas correctamente',
          confirmButtonColor:'#17a2b8',
        })
      );
      this.profileForm.reset();
    }
  }

}
