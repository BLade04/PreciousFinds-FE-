import { Component, OnInit, ViewChild, ViewEncapsulation, Inject, ElementRef, OnChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { invoiceListSerivce } from 'src/app/service/invoice.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  subscription : Subscription;
  dataSource;
  displayedColumns: string[] = [ 'invoiceId', 'orderId', 'customerFname',
  'customerLname', 'date', 'subTotal', 'tax', 'amountDue' ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private invoicelistService : invoiceListSerivce, public dialog: MatDialog,) { }

  ngOnInit() {
    this.invoicelistService.getSupplierList();
    this.subscription = this.invoicelistService.getInvoiceListListener()
      .subscribe((data: any) => {
        let invoicelist = data.data;
        this.dataSource = new MatTableDataSource(invoicelist);
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


}
