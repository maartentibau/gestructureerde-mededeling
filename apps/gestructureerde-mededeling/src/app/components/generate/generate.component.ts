import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OgmService } from '../../core/services/ogm.service';
import { OgmData } from '../../core/ogm.model';

@Component({
  selector: 'ogm-generate',
  templateUrl: './generate.component.html',
  styleUrls: ['./generate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenerateComponent implements OnInit {
  ogm: OgmData;

  constructor(private ogmService: OgmService, private snackBar: MatSnackBar) {}

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
