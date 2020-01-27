import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatGridListModule } from '@angular/material/grid-list';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { HomeComponent } from './home/home.component';
import { StatComponent } from './stat/stat.component';
import { BestSellerComponent } from './best-seller/best-seller.component';
import { LimitedEditionComponent } from './limited-edition/limited-edition.component';
import { NewArrivalsComponent } from './new-arrivals/new-arrivals.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MDBBootstrapModule.forRoot()
  ],
  declarations: [HomeComponent, StatComponent, BestSellerComponent, LimitedEditionComponent, NewArrivalsComponent]
})
export class DashboardModule {}
