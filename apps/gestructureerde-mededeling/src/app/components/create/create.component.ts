import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OgmService } from '../../core/services/ogm.service';
import { OgmInputChange } from '../../core/components/ogm-input/ogm-input.component';

@Component({
  selector: 'ogm-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent {
  readonly ogm$: BehaviorSubject<string>;

  constructor(private ogmService: OgmService) {
    this.ogm$ = new BehaviorSubject<string>(this.ogmService.init());
  }

  ogmInputChangeHandler({ ogm }: OgmInputChange) {
    this.ogm$.next(ogm);
  }
}
