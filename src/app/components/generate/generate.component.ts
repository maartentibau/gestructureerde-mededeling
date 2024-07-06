import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { ControlsComponent } from '../../core/components/controls/controls.component';
import { NumberComponent } from '../../core/components/number/number.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmData } from '../../core/ogm.model';
import { OgmService } from '../../core/services/ogm.service';

@Component({
  standalone: true,
  imports: [NumberComponent, ControlsComponent, MatSnackBarModule],
  selector: 'ogm-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateComponent implements OnInit {
  #ogmService: OgmService = inject(OgmService);
  #snackBar: MatSnackBar = inject(MatSnackBar);
  #title: Title = inject(Title);

  readonly ogm = signal<OgmData | null>(null);

  constructor() {
    this.#title.setTitle(`${DEFAULT_TITLE} - Genereer een willekeurig gestructureerde mededeling`);
  }

  ngOnInit() {
    this.refreshClickHandler();
  }

  refreshClickHandler() {
    const ogmNumber = this.#ogmService.generate();
    const ogmNumberFormat = this.#ogmService.format(ogmNumber);

    this.ogm.set({ number: ogmNumber, numberFormat: ogmNumberFormat });
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
