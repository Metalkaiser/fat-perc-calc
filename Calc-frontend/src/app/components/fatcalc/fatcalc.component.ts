import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms'
import { FatcalcService } from "../../services/fatcalc.service";

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
  resultdiv = 'display:none;';

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
    if (typeof(h) != 'number' || typeof(n) != 'number' || typeof(ws) != 'number' || typeof(wt) != 'number') {
      this.ffields = false;
    }
    if (this.ffields) {
      this.fatCalc.calculate(this.form.value).subscribe(
        response => {
        console.log(Object.values(response));
        this.result = Object.values(response)[0];
        this.muscle = Object.values(response)[3];
        this.fat = Object.values(response)[2];
        this.resultdiv = 'display:block;';
        }
      );
    }else {
      console.log('Incorrecto');
    }
  }

}
