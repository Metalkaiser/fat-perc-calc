import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingComponent } from './landing/landing.component';
import { FatcalcComponent } from "./components/fatcalc/fatcalc.component";
import { CalcalcComponent } from "./components/calcalc/calcalc.component";
import { HistoryComponent } from "./components/history/history.component";
import { ConfigsComponent } from "./components/configs/configs.component";
import { HelpComponent } from "./components/help/help.component";

const routes: Routes = [
  {path:'', component: LandingComponent},
  {path:'fatcalc', component: FatcalcComponent},
  {path:'calcalc', component: CalcalcComponent},
  {path:'history', component: HistoryComponent},
  {path:'configs', component: ConfigsComponent},
  {path:'help', component: HelpComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
