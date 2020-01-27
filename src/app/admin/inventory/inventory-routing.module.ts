import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryStocksComponent } from './inventory-stocks/inventory-stocks.component';

const routes: Routes = [
  {
    path: '',
    component: InventoryStocksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
