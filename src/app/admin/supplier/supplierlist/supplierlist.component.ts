import { Component, OnInit, ViewChild, ViewEncapsulation, Inject, ElementRef, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { supplierListSerivce } from 'src/app/service/supplier-list.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { SupplierModalComponent } from './supplier-modal/supplier-modal.component';


@Component({
  selector: 'app-supplierlist',
  templateUrl: './supplierlist.component.html',
  styleUrls: ['./supplierlist.component.scss']
})
export class SupplierlistComponent implements OnInit {
  subscription : Subscription;
  dataSource;
  displayedColumns: string[] = [ 'supplierId', 'name', 'contactNumber', 'email','address'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private supplierlistService : supplierListSerivce, public dialog: MatDialog,) { }

  ngOnInit() {
    this.supplierlistService.getSupplierList();
    this.subscription = this.supplierlistService.getSupplierListListener()
      .subscribe((data: any) => {
        let supplierlist = data.data;
        this.dataSource = new MatTableDataSource(supplierlist);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  syncPrimaryPaginator(event: PageEvent) {
    this.paginator.pageIndex = event.pageIndex;
    this.paginator.pageSize = event.pageSize;
    this.paginator.page.emit(event);
  }

  openModal(supplierId :String, category:String): void {
    const modalProperties = new MatDialogConfig();
    modalProperties.autoFocus = false;
    modalProperties.width = "40%";
    modalProperties.height = "85%";

    let modalContent = this.dialog.open(SupplierModalComponent, modalProperties);
    let modalComponentInstance = modalContent.componentInstance;
    modalComponentInstance.supplierId = supplierId;
    modalComponentInstance.category = category;
	}
}