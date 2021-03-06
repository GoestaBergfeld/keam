import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/glob';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports/reports.component';

@NgModule({
  imports: [
    CommonModule,
    ReportsRoutingModule,
    SharedModule
  ],
  declarations: [
    ReportsComponent
  ],
  entryComponents: [
  ]
})
export class ReportsModule { }
