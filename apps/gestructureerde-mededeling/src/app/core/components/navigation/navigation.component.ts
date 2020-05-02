import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationEntity, NavigationLabel } from './navigation.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints } from '@angular/cdk/layout';
import { ScreenService } from '../../services/screen.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCog, faShieldCheck, faStar } from '@fortawesome/pro-solid-svg-icons';

const APP_NAVIGATION: NavigationEntity[] = [
  { path: ['/create'], label: { long: 'Zelf mededeling maken', short: 'Zelf maken' }, icon: ['fas', 'star'] },
  { path: ['/generate'], label: { long: 'Genereer mededeling', short: 'Genereren' }, icon: ['fas', 'cog'] },
  {
    path: ['/validate'],
    label: { long: 'Controleer mededeling', short: 'Controleren' },
    icon: ['fas', 'shield-check'],
  },
];

@Component({
  selector: 'ogm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  readonly navigation$: Observable<Omit<NavigationEntity, 'label'>[]>;
  readonly isSmallScreen$: Observable<boolean>;
  readonly appTitle$: Observable<string>;

  constructor(private screenService: ScreenService, private faIconLibrary: FaIconLibrary) {
    this.isSmallScreen$ = this.screenService
      .observerBreakpoints()
      .pipe(
        map(
          (breakpoints: { [key: string]: boolean }) => breakpoints[Breakpoints.XSmall] || breakpoints[Breakpoints.Small]
        )
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
      })
    );

    this.appTitle$ = this.screenService
      .observerBreakpoints()
      .pipe(
        map((breakpoints: { [key: string]: boolean }) =>
          breakpoints[Breakpoints.XSmall] ? 'OGM' : 'Gestructureerde Mededeling'
        )
      );

    this.faIconLibrary.addIcons(faShieldCheck, faCog, faStar);
  }
}
