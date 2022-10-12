import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FatcalcService } from 'src/app/services/fatcalc.service';

@Component({
  selector: 'app-calcalc',
  templateUrl: './calcalc.component.html',
  styleUrls: ['./calcalc.component.css']
})
export class CalcalcComponent implements OnInit {

  constructor(private formBuilder:FormBuilder, private fatCalc:FatcalcService) { }

  calform = this.formBuilder.group({
    weight: null,
    height: null,
    age: null,
    activity: null
  });

  result = 'display:none;';
  cal:number = 0;
  win:number = 0;
  lose:number = 0;
  hc:number = 0;
  pt:number = 0;
  ft:number = 0;


  ngOnInit(): void {
  }

  calculateCal(){

    this.fatCalc.calories(this.calform.value).subscribe(
      response => {
        this.cal = Object.values(response)[0];
        this.win = Object.values(response)[4];
        this.lose = Object.values(response)[5];
        this.hc = Object.values(response)[1];
        this.pt = Object.values(response)[2];
        this.ft = Object.values(response)[3];
      }
    );
    this.result = 'display:block;';
    console.log(this.calform.value);
  }

}
