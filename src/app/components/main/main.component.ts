import { Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCog, faStar } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { ScreenService } from '../../core/services/screen.service';

@Component({
  standalone: true,
  imports: [AsyncPipe, MatButtonModule, FontAwesomeModule, RouterLink],
  selector: 'ogm-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  #screenService: ScreenService = inject(ScreenService);
  #faIconLibrary: FaIconLibrary = inject(FaIconLibrary);
  #title: Title = inject(Title);

  readonly isSmallScreen$: Observable<boolean>;

  constructor() {
    this.#title.setTitle(DEFAULT_TITLE);

    this.isSmallScreen$ = this.#screenService
      .observerBreakpoints()
      .pipe(
        map((breakpoints: { [key: string]: boolean }) =>
          Boolean(breakpoints[Breakpoints.XSmall] || breakpoints[Breakpoints.Small]),
        ),
      );

    this.#faIconLibrary.addIcons(faCheckCircle, faCog, faStar);
  }
}
