import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ScreenService } from '../../services/screen.service';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { map } from 'rxjs/operators';
import { Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { faCommentDots, faCommentLines, faSyncAlt } from '@fortawesome/pro-duotone-svg-icons';
import { OgmData } from '../../ogm.model';
import ClipboardJS from 'clipboard';

@Component({
  selector: 'ogm-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ControlsComponent implements OnDestroy {
  @Input() refresh: boolean | undefined;
  @Input() copyNumber: boolean | undefined;
  @Input() copyOgm: boolean | undefined;
  @Input() ogm: OgmData | null | undefined;

  @Output() refreshClick: EventEmitter<void> = new EventEmitter<void>();
  @Output() copyNumberClick: EventEmitter<string> = new EventEmitter<string>();
  @Output() copyOgmClick: EventEmitter<string> = new EventEmitter<string>();

  readonly isSmallScreen$: Observable<boolean>;
  readonly clipboard: ClipboardJS;

  constructor(private screenService: ScreenService, private faIconLibrary: FaIconLibrary) {
    this.isSmallScreen$ = this.screenService
      .observerBreakpoints()
      .pipe(map((breakpoints: { [key: string]: boolean }) => breakpoints[Breakpoints.XSmall]));

    this.clipboard = new ClipboardJS('.ogm-copy');

    this.faIconLibrary.addIcons(faSyncAlt, faCommentDots, faCommentLines);
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
