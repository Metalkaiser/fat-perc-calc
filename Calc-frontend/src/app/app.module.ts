import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FatcalcComponent } from './components/fatcalc/fatcalc.component';
import { CalcalcComponent } from './components/calcalc/calcalc.component';
import { HistoryComponent } from './components/history/history.component';
import { ConfigsComponent } from './components/configs/configs.component';
import { HelpComponent } from './components/help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    AuthComponent,
    DashboardComponent,
    HeaderComponent,
    FooterComponent,
    FatcalcComponent,
    CalcalcComponent,
    HistoryComponent,
    ConfigsComponent,
    HelpComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
