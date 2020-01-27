import { NgModule } from '@angular/core';
import {
  MatToolbarModule,
  MatSelectModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatCheckboxModule,
  MatCardModule,
  MatTabsModule,
  MatTableModule,
  MatPaginatorModule,
  MatTreeModule,
  MatButtonToggleModule,
  MatExpansionModule,
  MatDialogModule

} from '@angular/material';

const MaterialComponents = [
  MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatPaginatorModule,
    MatTreeModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatToolbarModule,
    MatDialogModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
  })

export class MaterialModule { }
