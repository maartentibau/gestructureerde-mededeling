import { Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCog, faStar } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { ScreenService } from '../../core/services/screen.service';

@Component({
  selector: 'ogm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  readonly isSmallScreen$: Observable<boolean>;

  constructor(private screenService: ScreenService, private faIconLibrary: FaIconLibrary, private title: Title) {
    this.title.setTitle(DEFAULT_TITLE);

    this.isSmallScreen$ = this.screenService
      .observerBreakpoints()
      .pipe(
        map((breakpoints: { [key: string]: boolean }) =>
          Boolean(breakpoints[Breakpoints.XSmall] || breakpoints[Breakpoints.Small])
        )
      );

    this.faIconLibrary.addIcons(faCheckCircle, faCog, faStar);
  }
}
