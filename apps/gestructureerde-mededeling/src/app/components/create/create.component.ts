import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OgmService } from '../../core/services/ogm.service';
import { OgmInputChange } from '../../core/components/ogm-input/ogm-input.component';
import { ScreenService } from '../../core/services/screen.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OgmData } from '../../core/ogm.model';
import * as ClipboardJS from 'clipboard';
import { map } from 'rxjs/operators';
import { Breakpoints } from '@angular/cdk/layout';
import { faCommentDots, faCommentLines, faSyncAlt } from '@fortawesome/pro-duotone-svg-icons';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'ogm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnDestroy {
  readonly isSmallScreen$: Observable<boolean>;
  readonly ogm$: BehaviorSubject<string>;

  ogm: OgmData;
  clipboard: ClipboardJS;

  constructor(
    private ogmService: OgmService,
    private screenService: ScreenService,
    private snackBar: MatSnackBar,
    private faIconLibrary: FaIconLibrary
  ) {
    this.isSmallScreen$ = this.screenService
      .observerBreakpoints()
      .pipe(map((breakpoints: { [key: string]: boolean }) => breakpoints[Breakpoints.XSmall]));

    this.ogm$ = new BehaviorSubject<string>(this.ogmService.init());

    this.clipboard = new ClipboardJS('.ogm-copy');

    this.faIconLibrary.addIcons(faSyncAlt, faCommentDots, faCommentLines);
  }

  ngOnDestroy() {
    this.clipboard.destroy();
  }

  ogmInputChangeHandler({ ogm }: OgmInputChange) {
    this.ogm = { number: this.ogmService.clean(ogm), numberFormat: ogm };

    this.ogm$.next(ogm);
  }

  copyToClipboard(message: string) {
    this.showSnackbarMessage(message);
  }

  showSnackbarMessage(message?: string) {
    if (message) {
      this.snackBar.open(message, '', {
        panelClass: 'center-clipboard-text',
        verticalPosition: 'top',
        duration: 750,
      });
    }
  }
}
