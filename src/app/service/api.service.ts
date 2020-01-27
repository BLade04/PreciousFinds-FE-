import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    API_URL_DASHBOARD   = environment.apiUrl + '/dashboard';
    API_URL_INVOICE   = environment.apiUrl + '/invoice';
    API_URL_LANDINGPAGE = environment.apiUrl + '/landingpage';
    API_URL_MYSTORE = environment.apiUrl + '/mystore';
    API_URL_ORDERS = environment.apiUrl + '/orders';
    API_URL_SUPPLIER = environment.apiUrl + '/supplier';

  subscription: Subscription;
  private subject = new Subject<any>();
  constructor() { }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  // getTribes(): Observable<any> {
  //   return this.subject.asObservable();
  // }

  apiFunc() {
    return 'hello apiFunc()';
  }
}