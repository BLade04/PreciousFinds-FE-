import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL_INVOICE   = environment.apiUrl + '/invoice';
@Injectable({ 
  providedIn: 'root'
})

export class invoiceListSerivce extends ApiService implements OnDestroy {
  private invoiceTableListener = new Subject();
  invoicelist;

  constructor(private http: HttpClient) {
    super();
  }
  getSupplierList() {
    this.http.get(API_URL_INVOICE + '/list').subscribe((response) => {
      this.invoicelist = response;
      this.invoiceTableListener.next(this.invoicelist);
    }); }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

getInvoiceListListener() {
  return this.invoiceTableListener.asObservable();
}

}

