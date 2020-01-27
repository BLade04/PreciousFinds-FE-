import { Component, OnInit, OnDestroy } from '@angular/core';
import { LandingPageService } from 'src/app/service/landing-page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.scss']
})
export class BestSellerComponent implements OnInit, OnDestroy {

  private getLandingPageListListener$: Subscription;
  bestSellerData: any;

  constructor(
    private landingPageService: LandingPageService,
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
    this.landingPageService.getBestSellerList();
    this.getLandingPageListListener$ = this.landingPageService.getBestSellerListener().subscribe((data: any) => {
      this.bestSellerData = data.data;
      this.slides = this.chunk(this.bestSellerData, 3);
    });
  }

  ngOnDestroy() {
    this.getLandingPageListListener$.unsubscribe();
  }
}
