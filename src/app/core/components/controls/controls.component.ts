import { Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, OnDestroy, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCommentDots, faMoneyCheck, faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import ClipboardJS from 'clipboard';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OgmData } from '../../ogm.model';
import { ScreenService } from '../../services/screen.service';

@Component({
    imports: [AsyncPipe, MatButtonModule, FontAwesomeModule],
    selector: 'ogm-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ControlsComponent implements OnDestroy {
  #screenService: ScreenService = inject(ScreenService);
  #faIconLibrary: FaIconLibrary = inject(FaIconLibrary);

  readonly refresh = input<boolean>(false);
  readonly copyNumber = input<boolean>(false);
  readonly copyOgm = input<boolean>(false);
  readonly ogm = input<OgmData | null>(null);

  readonly refreshClick = output<void>();
  readonly copyNumberClick = output<string>();
  readonly copyOgmClick = output<string>();

  readonly isSmallScreen$: Observable<boolean>;
  readonly clipboard: ClipboardJS;

  constructor() {
    this.isSmallScreen$ = this.#screenService
      .observerBreakpoints()
      .pipe(map((breakpoints: { [key: string]: boolean }) => breakpoints[Breakpoints.XSmall]));

    this.clipboard = new ClipboardJS('.ogm-copy');

    this.#faIconLibrary.addIcons(faSyncAlt, faCommentDots, faMoneyCheck);
  }

  ngOnDestroy() {
    this.clipboard.destroy();
  }

  refreshClickHandler() {
    this.refreshClick.emit();
  }

  copyNumberClickHandler() {
    this.copyNumberClick.emit('Nummer gekopieerd naar klembord');
  }

  copyOgmClickHandler() {
    this.copyOgmClick.emit('Mededeling gekopieerd naar klembord');
  }
}
