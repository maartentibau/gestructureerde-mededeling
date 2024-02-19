import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Subject } from 'rxjs';
import { InputComponent, OgmInputChange } from '../../core/components/input/input.component';
import { NumberComponent } from '../../core/components/number/number.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmService } from '../../core/services/ogm.service';

@Component({
  standalone: true,
  imports: [NumberComponent, InputComponent, AsyncPipe],
  selector: 'ogm-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateComponent {
  #ogmService: OgmService = inject(OgmService);
  #title: Title = inject(Title);

  readonly ogm$: BehaviorSubject<string>;
  readonly isValid$: Subject<boolean | null>;

  constructor() {
    this.#title.setTitle(`${DEFAULT_TITLE} - Controleer een gestructureerde mededeling`);

    this.ogm$ = new BehaviorSubject<string>(this.#ogmService.init());
    this.isValid$ = new Subject<boolean | null>();
  }

  ogmInputChangeHandler({ ogm, isValid }: OgmInputChange) {
    this.ogm$.next(ogm);
    this.isValid$.next(isValid);
  }
}
