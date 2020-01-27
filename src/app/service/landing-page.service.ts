import { Injectable, OnDestroy } from '@angular/core';

import { ApiService } from './api.service';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

const API_URL_LANDINGPAGE = environment.apiUrl + '/landingpage';

@Injectable({
  providedIn: 'root'
})

export class LandingPageService extends ApiService implements OnDestroy {

  private bestSellerListener = new Subject();
  private limitedEditionListener = new Subject();
  private newArrivalsListener = new Subject();
  private bestSellerSubsription$: Subscription;
  private limitedEditionSubsription$: Subscription;
  private newArrivalsSubsription$: Subscription;

  bestSellerList: object;
  limitedEditionList: object;
  newArrivalsList: object;

    constructor(private http: HttpClient) {
      super();
    }

    getBestSellerList() {
      this.bestSellerSubsription$ = this.http.get(API_URL_LANDINGPAGE + '/best-seller').subscribe((res) => {
        this.bestSellerList = res;
        this.bestSellerListener.next(this.bestSellerList);
      });
    }

    getLimitedEditionList() {
      this.limitedEditionSubsription$ = this.http.get(API_URL_LANDINGPAGE + '/limited-edition').subscribe((res) => {
        this.limitedEditionList = res;
        this.limitedEditionListener.next(this.limitedEditionList);
      });
    }

    getNewArrivalsList() {
      this.newArrivalsSubsription$ = this.http.get(API_URL_LANDINGPAGE + '/new-arrivals').subscribe((res) => {
        this.newArrivalsList = res;
        this.newArrivalsListener.next(this.newArrivalsList);
      });
    }

    getBestSellerListener() {
      return this.bestSellerListener.asObservable();
    }

    getLimitedEditionListener() {
      return this.limitedEditionListener.asObservable();
    }

    getNewArrivalsListener() {
      return this.newArrivalsListener.asObservable();
    }

    ngOnDestroy() {
      this.bestSellerSubsription$.unsubscribe();
      this.limitedEditionSubsription$.unsubscribe();
      this.newArrivalsSubsription$.unsubscribe();
    }
}
