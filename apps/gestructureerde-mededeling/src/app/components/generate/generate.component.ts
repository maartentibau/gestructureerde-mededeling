import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import * as ClipboardJS from 'clipboard';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Breakpoints } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ScreenService } from '../../core/services/screen.service';
import { OgmService } from '../../core/services/ogm.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSyncAlt, faCommentDots, faCommentLines } from '@fortawesome/pro-duotone-svg-icons';
import { OgmData } from '../../core/ogm.model';

@Component({
  selector: 'ogm-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateComponent implements OnInit, OnDestroy {
  readonly isSmallScreen$: Observable<boolean>;

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

    this.clipboard = new ClipboardJS('.ogm-copy');

    this.faIconLibrary.addIcons(faSyncAlt, faCommentDots, faCommentLines);
  }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    this.clipboard.destroy();
  }

  refresh(message?: string) {
    this.showSnackbarMessage(message);

    const ogmNumber = this.ogmService.generate();
    const ogmNumberFormat = this.ogmService.format(ogmNumber);

    this.ogm = { number: ogmNumber, numberFormat: ogmNumberFormat };
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
