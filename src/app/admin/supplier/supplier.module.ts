import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierlistComponent } from './supplierlist/supplierlist.component';
import { MaterialModule } from 'src/app/material/material.module';
import { SupplierModalComponent } from './supplierlist/supplier-modal/supplier-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FlexLayoutModule,
    MatCardModule,
    MatButtonModule,
    MDBBootstrapModule.forRoot(),
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
    
    
  ],
  entryComponents:[
    SupplierModalComponent
  ],
  declarations: [SupplierlistComponent, SupplierModalComponent]
})

export class SupplierModule { }
