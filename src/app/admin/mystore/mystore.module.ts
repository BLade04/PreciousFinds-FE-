import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MystoreListComponent } from './mystore-list/mystore-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MystoreRoutingModule } from './mystore-routing.module';
import { MystoreModalComponent } from './mystore-modal/mystore-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MystoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,


   

  ],
  entryComponents:[
    MystoreModalComponent
  ],
declarations: [MystoreListComponent, MystoreModalComponent]
})
export class MystoreModule { }
