import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-arrivals',
  templateUrl: './new-arrivals.component.html',
  styleUrls: ['./new-arrivals.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewArrivalsComponent implements OnInit, OnDestroy {

  private getLandingPageListListener$: Subscription;
  newArrivalsData: any;

  constructor(
    private landingPageService: LandingPageService
  ) { }

  slides: any = [[]];
  chunk(arr, chunkSize) {
    const R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.landingPageService.getNewArrivalsList();
    this.getLandingPageListListener$ = this.landingPageService.getNewArrivalsListener().subscribe((data: any) => {
      this.newArrivalsData = data.data;
      this.slides = this.chunk(this.newArrivalsData, 3);
    });
  }

  ngOnDestroy() {
    this.getLandingPageListListener$.unsubscribe();
  }
}
