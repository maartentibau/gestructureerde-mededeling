import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OgmService } from '../../core/services/ogm.service';
import { OgmInputChange } from '../../core/components/ogm-input/ogm-input.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OgmData } from '../../core/ogm.model';

@Component({
  selector: 'ogm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  readonly ogm$: BehaviorSubject<string>;

  ogm: OgmData;

  constructor(private ogmService: OgmService, private snackBar: MatSnackBar) {
    this.ogm$ = new BehaviorSubject<string>(this.ogmService.init());
  }

  ogmInputChangeHandler({ ogm }: OgmInputChange) {
    const cleanOgm = this.ogmService.clean(ogm);

    this.ogm = cleanOgm === '' ? undefined : { number: cleanOgm, numberFormat: ogm };
    this.ogm$.next(ogm);
  }

  copyNumberClickHandler(message: string) {
    this.showSnackbarMessage(message);
  }

  copyOgmClickHandler(message: string) {
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
