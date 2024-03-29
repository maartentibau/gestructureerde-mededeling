import { AsyncPipe, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { ControlsComponent } from '../../core/components/controls/controls.component';
import { InputComponent, OgmInputChange } from '../../core/components/input/input.component';
import { NumberComponent } from '../../core/components/number/number.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmData } from '../../core/ogm.model';
import { OgmService } from '../../core/services/ogm.service';

@Component({
  standalone: true,
  imports: [NumberComponent, InputComponent, ControlsComponent, NgIf, AsyncPipe, MatSnackBarModule],
  selector: 'ogm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  #ogmService: OgmService = inject(OgmService);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #title: Title = inject(Title);

  readonly ogm$: BehaviorSubject<string>;

  ogm: OgmData | undefined;

  constructor() {
    this.#title.setTitle(`${DEFAULT_TITLE} - Zelf een gestructureerde mededeling maken`);

    this.ogm$ = new BehaviorSubject<string>(this.#ogmService.init());
  }

  ogmInputChangeHandler({ ogm }: OgmInputChange) {
    const cleanOgm = this.#ogmService.clean(ogm);

    this.ogm = cleanOgm === '' ? undefined : { number: cleanOgm, numberFormat: ogm };
    this.ogm$?.next(ogm);
  }

  copyNumberClickHandler(message: string) {
    this.showSnackbarMessage(message);
  }

  copyOgmClickHandler(message: string) {
    this.showSnackbarMessage(message);
  }

  showSnackbarMessage(message?: string) {
    if (message) {
      this.#snackBar.open(message, '', {
        panelClass: 'center-clipboard-text',
        verticalPosition: 'top',
        duration: 750,
      });
    }
  }
}
