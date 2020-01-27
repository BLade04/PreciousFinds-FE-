import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryStocksComponent } from './inventory-stocks/inventory-stocks.component';
import { MaterialModule } from 'src/app/material/material.module';
import { InventoryRoutingModule } from './inventory-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    InventoryRoutingModule
   
    
  ],
  entryComponents:[

  ],
  declarations: [InventoryStocksComponent]
})
export class InventoryModule { }
