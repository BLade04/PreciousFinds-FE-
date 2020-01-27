import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupplierlistComponent } from './supplierlist/supplierlist.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
