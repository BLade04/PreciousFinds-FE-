import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MystoreListComponent } from './mystore-list/mystore-list.component';


const routes: Routes = [
  {
    path: '',
    component: MystoreListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MystoreRoutingModule { }
