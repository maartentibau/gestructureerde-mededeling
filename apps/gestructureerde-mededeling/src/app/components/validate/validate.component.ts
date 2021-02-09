import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { OgmInputChange } from '../../core/components/input/input.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmService } from '../../core/services/ogm.service';

@Component({
  selector: 'ogm-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateComponent {
  readonly ogm$: BehaviorSubject<string>;
  readonly isValid$: Subject<boolean>;

  constructor(private ogmService: OgmService, private title: Title) {
    this.title.setTitle(`${DEFAULT_TITLE} - Controleer een gestructureerde mededeling`);

    this.ogm$ = new BehaviorSubject<string>(this.ogmService.init());
    this.isValid$ = new Subject<boolean>();
  }

  ogmInputChangeHandler({ ogm, isValid }: OgmInputChange) {
    this.ogm$.next(ogm);
    this.isValid$.next(isValid);
  }
}
