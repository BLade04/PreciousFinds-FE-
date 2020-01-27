import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LandingPageService } from 'src/app/service/landing-page.service';

@Component({
  selector: 'app-limited-edition',
  templateUrl: './limited-edition.component.html',
  styleUrls: ['./limited-edition.component.scss']
})
export class LimitedEditionComponent implements OnInit, OnDestroy {

  private getLandingPageListListener$: Subscription;
  limitedEditionData: any;

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
    this.landingPageService.getLimitedEditionList();
    this.getLandingPageListListener$ = this.landingPageService.getLimitedEditionListener().subscribe((data: any) => {
      this.limitedEditionData = data.data;
      this.slides = this.chunk(this.limitedEditionData, 3);
    });
  }

  ngOnDestroy() {
    this.getLandingPageListListener$.unsubscribe();
  }
}
