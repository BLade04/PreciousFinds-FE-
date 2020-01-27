import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        redirectTo: 'invoice'
      },
      {
        path: 'invoice',
        component: InvoiceComponent
      },
      {
        path: 'pending',
        component: PendingOrdersComponent
      },
      {
        path: 'completed',
        component: CompletedOrdersComponent
      },
      {
        path: '**',
        redirectTo: 'invoice'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsRoutingModule {}
