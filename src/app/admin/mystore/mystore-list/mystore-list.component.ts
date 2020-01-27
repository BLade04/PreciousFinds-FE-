import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { MyStoreService } from 'src/app/service/my-store.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { MystoreModalComponent } from '../mystore-modal/mystore-modal.component';
@Component({
  selector: 'app-mystore-list',
  templateUrl: './mystore-list.component.html',
  styleUrls: ['./mystore-list.component.scss']
})
export class MystoreListComponent implements OnInit {
  subscription : Subscription;
  dataSource;
  displayedColumns: string[] = [ 'productId','sizes', 'productName','category','price', 'stocks'];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private myStoreService : MyStoreService, public dialog: MatDialog,) { }

  ngOnInit() {
    this.myStoreService.getProductList();
    this.subscription = this.myStoreService.getProductListListener()
      .subscribe((data: any) => {
        let productList = data.data;
        this.dataSource = new MatTableDataSource(productList);
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
  openModal(productId :String, category:String): void {
    const modalProperties = new MatDialogConfig();
    modalProperties.autoFocus = false;
    modalProperties.width = "40%";
    modalProperties.height = "85%";

    //let modalContent = this.dialog.open(TribesModalComponent,modalProperties);
    // let modalContent = this.dialog.open(TribesModalComponent, { panelClass: 'custom-modalbox', width: '600px', height: '675px', autoFocus: false });
    // let modalContent = this.dialog.open(TribesModalComponent, { panelClass: 'custom-modalbox', width: '600px', height: '550px', autoFocus: false });
    // let modalContent = this.dialog.open(TribesModalComponent, { panelClass: 'custom-modalbox', width: '40%', height: '90%', autoFocus: false});
    let modalContent = this.dialog.open(MystoreModalComponent, modalProperties);
    let modalComponentInstance = modalContent.componentInstance;
    modalComponentInstance.productId = productId;
    modalComponentInstance.category = category;
	}

}