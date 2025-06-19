import { Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCog, faStar } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ScreenService } from '../../services/screen.service';
import { MainNavigation, NavigationEntity, NavigationLabel } from './navigation.model';

export const APP_NAVIGATION: NavigationEntity[] = [
  { path: ['/create'], label: { long: 'Zelf mededeling maken', short: 'Zelf maken' }, icon: ['fas', 'star'] },
  { path: ['/generate'], label: { long: 'Genereer mededeling', short: 'Genereren' }, icon: ['fas', 'cog'] },
  {
    path: ['/validate'],
    label: { long: 'Controleer mededeling', short: 'Controleren' },
    icon: ['fas', 'check-circle'],
  },
];

@Component({
  imports: [
    MatToolbarModule,
    MatButtonModule,
    AsyncPipe,
    FontAwesomeModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'ogm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly navigation$: Observable<MainNavigation>;
  readonly isSmallScreen$: Observable<boolean>;
  readonly appTitle$: Observable<string>;

  constructor(
    private screenService: ScreenService,
    private faIconLibrary: FaIconLibrary,
  ) {
    this.isSmallScreen$ = this.screenService
      .observerBreakpoints()
      .pipe(
        map((breakpoints: { [key: string]: boolean }) =>
          Boolean(breakpoints[Breakpoints.XSmall] || breakpoints[Breakpoints.Small]),
        ),
      );

    this.navigation$ = this.screenService.observerBreakpoints().pipe(
      map((breakpoints: { [key: string]: boolean }) => {
        const labelSize: NavigationLabel =
          breakpoints[Breakpoints.XSmall] || breakpoints[Breakpoints.Small] || breakpoints[Breakpoints.Medium]
            ? NavigationLabel.Short
            : NavigationLabel.Long;

        return APP_NAVIGATION.map((navigation: NavigationEntity) => ({
          ...navigation,
          label: navigation.label[labelSize],
        }));
      }),
    );

    this.appTitle$ = this.screenService
      .observerBreakpoints()
      .pipe(
        map((breakpoints: { [key: string]: boolean }) =>
          breakpoints[Breakpoints.XSmall] ? 'OGM' : 'Gestructureerde Mededeling - OGM',
        ),
      );

    this.faIconLibrary.addIcons(faCheckCircle, faCog, faStar);
  }
}
