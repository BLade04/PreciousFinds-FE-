import { Injectable, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class DashboardService extends ApiService implements OnDestroy {

   constructor(private http: HttpClient) { super (); }

    ngOnDestroy() {
        // this.http.get(this.API_URL_DASHBOARD +'/')
        this.subscription.unsubscribe();
    }
}