import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    DashboardPageComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule
  ]
})
export class DashboardModule { }
