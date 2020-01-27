import { Injectable, OnDestroy } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_URL_SUPPLIER = environment.apiUrl + '/supplier';


@Injectable({ 
  providedIn: 'root'
})

export class supplierListSerivce extends ApiService implements OnDestroy {
  private supplierTableListener = new Subject();
  private supplierDetailsListener = new Subject();
  supplierlist;
  sameSize;

  constructor(private http: HttpClient) {
    super();
  }
  getSupplierList() {
    this.http.get(API_URL_SUPPLIER + '/list').subscribe((response) => {
      this.supplierlist = response;
      this.supplierTableListener.next(this.supplierlist);
    }); }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  createSupplier(id, name, contact_number, email, address ){
    const postData: any = {
      id: id,
      name: name, 
      contact_number: contact_number,
      email : email,
      address: address
    };  
    return this.http.post(this.API_URL_SUPPLIER, postData);
  }


getSupplierDetails(suppleirId: number) {
  this.http.get(API_URL_SUPPLIER + '/getSupplierDetails?id=' + suppleirId)
    .subscribe((response) => {
      this.sameSize = response;
      this.supplierDetailsListener.next(this.sameSize);
    });
}

getSupplierListListener() {
  return this.supplierTableListener.asObservable();
}

getSupplierDetailsListener(){
  return this.supplierDetailsListener.asObservable();
}
}

