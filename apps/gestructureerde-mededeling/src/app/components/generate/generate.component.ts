import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmService } from '../../core/services/ogm.service';
import { OgmData } from '../../core/ogm.model';

@Component({
  selector: 'ogm-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateComponent implements OnInit {
  ogm: OgmData | null | undefined;

  constructor(private ogmService: OgmService, private snackBar: MatSnackBar, private title: Title) {
    this.title.setTitle(`${DEFAULT_TITLE} - Genereer een willekeurig gestructureerde mededeling`);
  }

  ngOnInit() {
    this.refreshClickHandler();
  }

  refreshClickHandler() {
    const ogmNumber = this.ogmService.generate();
    const ogmNumberFormat = this.ogmService.format(ogmNumber);

    this.ogm = { number: ogmNumber, numberFormat: ogmNumberFormat };
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
