import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ControlsComponent } from '../../core/components/controls/controls.component';
import { InputComponent, Ogm } from '../../core/components/input/input.component';
import { NumberComponent } from '../../core/components/number/number.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmData } from '../../core/ogm.model';
import { OgmService } from '../../core/services/ogm.service';

@Component({
  imports: [NumberComponent, InputComponent, ControlsComponent, MatSnackBarModule, FormsModule],
  selector: 'ogm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  #ogmService: OgmService = inject(OgmService);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #title: Title = inject(Title);

  readonly ogm = signal<OgmData | null>({ number: null, numberFormat: this.#ogmService.init() });

  constructor() {
    this.#title.setTitle(`${DEFAULT_TITLE} - Zelf een gestructureerde mededeling maken`);
  }

  handleOgmChange({ ogm }: Ogm) {
    const cleanOgm = this.#ogmService.clean(ogm ?? '');

    this.ogm.set(
      cleanOgm === ''
        ? { number: null, numberFormat: this.#ogmService.init() }
        : { number: cleanOgm, numberFormat: ogm },
    );
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
