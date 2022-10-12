import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthserviceService } from 'src/app/authservice.service';

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
        response => console.log(response)
      ) 
      : console.log('verificar');
  }

  profile(){
    if (this.profileForm.value.lang == "" || this.profileForm.value.theme == "") {
      console.log('Valores vacíos');
    }else {
      this.authServ.changeProfile(this.profileForm.value)
      .subscribe(
        response => console.log(response)
      )
    }
  }

}
