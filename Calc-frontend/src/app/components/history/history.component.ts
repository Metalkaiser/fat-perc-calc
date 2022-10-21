import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthserviceService } from 'src/app/authservice.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  name:string = '';
  items: any[]  = [];
  datos:number[] = [];
  fechas:any []  = [];
  historial:any []  = [];
  imagen:string = '../../../assets/images/grasa-corporal-hombres.webp';

  constructor(private authServ:AuthserviceService) { }

  user:any;

  ngOnInit(): void {

    this.authServ.dashboard().subscribe(
      response => {
        let currentItem = Object.values(response);
        this.items = [
          currentItem[0]
        ];

        console.log(currentItem[0].details.gender);

        currentItem[0].history.shift();
        this.historial = currentItem[0].history.slice(0,currentItem[0].history.length);
        this.historial.reverse();

        currentItem[0].history.forEach((element: any) => {
          if (Object.keys(element).length > 0) {
            this.datos.push(element.pfat.toFixed(2));
            this.fechas.push(element.date.toString().substring(0,10));
          }
        });


        this.chartOptions = {
          series: [
            {
              name: "grasa corporal",
              data: this.datos
            }
          ],
          chart: {
            height: 350,
            type: "line",
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: true
          },
          stroke: {
            curve: "smooth"
          },
          title: {
            text: "Historial de porcentaje de grasa corporal",
            align: "left"
          },
          grid: {
            row: {
              colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
              opacity: 0.5
            }
          },
          xaxis: {
            categories: this.fechas
          }
        };


      },
      error => console.log(error)
    )

  }

}
