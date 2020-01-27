import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule as FormModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { FormsRoutingModule } from './forms-routing.module';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { PendingOrdersComponent } from './pending-orders/pending-orders.component';
import { CompletedOrdersComponent } from './completed-orders/completed-orders.component';

@NgModule({
  imports: [
    SharedModule,
    FormsRoutingModule,
    FormModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule
  ],
  declarations: [
    HomeComponent,
    InvoiceComponent,
    PendingOrdersComponent,
    CompletedOrdersComponent
  ]
})
export class FormsModule {}
