import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { OgmService } from '../../core/services/ogm.service';
import { OgmInputChange } from '../../core/components/input/input.component';

@Component({
  selector: 'ogm-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateComponent {
  readonly ogm$: BehaviorSubject<string>;
  readonly isValid$: Subject<boolean> = new Subject<boolean>();

  constructor(private ogmService: OgmService) {
    this.ogm$ = new BehaviorSubject<string>(this.ogmService.init());
    this.isValid$ = new Subject<boolean>();
  }

  ogmInputChangeHandler({ ogm, isValid }: OgmInputChange) {
    this.ogm$.next(ogm);
    this.isValid$.next(isValid);
  }
}
