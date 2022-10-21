import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { FatcalcService } from "../../services/fatcalc.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-fatcalc',
  templateUrl: './fatcalc.component.html',
  styleUrls: ['./fatcalc.component.css']
})
export class FatcalcComponent implements OnInit {

  fatFormMale = this.formBuilder.group({
    waist: '',
    neck: '',
    height: '',
    weight: ''
  });

  fatFormFemale = this.formBuilder.group({
    waist: '',
    neck: '',
    hip: '',
    height: '',
    weight: ''
  });

  male:boolean = false;
  ffields:boolean = true;
  form:any;

  constructor(private formBuilder: FormBuilder, private fatCalc:FatcalcService) { }

  ngOnInit(): void {
    var cookies = document.cookie.split("; ");
    for (let index = 0; index < cookies.length; index++) {
      var c = cookies[index].split("=");
      if (c[0] == 'gender') {
        if (c[1] == 'male') {
          this.male = true;
        }
      }
      
    }
  }

  result:number = 0;
  muscle:number = 0;
  fat:number = 0;
  tip:string = '';

  calculateFat(): void {
    if (this.male) {
      this.form = this.fatFormMale;
    } else {
      this.form = this.fatFormFemale;
      let hp = this.form.value.hip;
      //en caso que sea mujer, verifica el campo numérico Cadera
      typeof(hp) != 'number' ? this.ffields = false : true;
    }
    let h = this.form.value.height;
    let ws = this.form.value.waist;
    let wt = this.form.value.weight;
    let n = this.form.value.neck;
    //verifica los campos numéricos
    if (typeof(h) != 'number') {
      this.ffields = false;
      console.log('height');
      console.log(typeof(h));
    }else if (typeof(n) != 'number') {
      this.ffields = false;
      console.log('neck');
      console.log(typeof(n));
    } else if (typeof(ws) != 'number') {
      this.ffields = false;
      console.log('waist');
      console.log(typeof(ws));
    } else if (typeof(wt) != 'number') {
      this.ffields = false
      console.log('weight');
      console.log(typeof(wt));
    }
    if (this.ffields) {
      this.fatCalc.calculate(this.form.value).subscribe(
        response => {
        this.result = Object.values(response)[0];
        this.muscle = Object.values(response)[3];
        this.fat = Object.values(response)[2];
        switch (Object.values(response)[1]) {
          case 'underweight':
            this.tip = 'Usted necesita ganar algo de peso';
            break;
          case 'healthy':
            this.tip = 'Usted tiene un peso saludable';
            break;
          case 'warning':
            this.tip = 'Usted tiene un peso saludable, aunque es recomendable que pierda un poco de grasae';
            break;
          case 'overweight':
            this.tip = 'Usted tiene sobrepeso y necesita perder algo de peso';
            break;
          case 'obesity':
            this.tip = 'Usted sufre de obesidad y necesita perder peso <strong style=\'color:red\'>urgentemente</strong>';
            break;
          default:
            break;
        }
        (<HTMLInputElement>document.getElementById("tip")).innerHTML = this.tip;
        (<HTMLInputElement>document.getElementById("results")).style.display = "flex";
        }
      );
    }else {
      Swal.fire({
        title:'Error',
        icon:'error',
        text:'Llene los campos únicamente con información numérica',
        confirmButtonColor:'#17a2b8',
        allowOutsideClick:false,
        allowEscapeKey:false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    }
  }

}
