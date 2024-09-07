import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { InputComponent, Ogm } from '../../core/components/input/input.component';
import { NumberComponent } from '../../core/components/number/number.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmService } from '../../core/services/ogm.service';

@Component({
  standalone: true,
  imports: [NumberComponent, InputComponent, AsyncPipe, FormsModule],
  selector: 'ogm-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidateComponent {
  #ogmService: OgmService = inject(OgmService);
  #title: Title = inject(Title);

  readonly ogm = signal<string | null>(this.#ogmService.init());
  readonly isValid = signal<boolean | null>(null);

  constructor() {
    this.#title.setTitle(`${DEFAULT_TITLE} - Controleer een gestructureerde mededeling`);
  }

  handleOgmChange({ ogm, isValid }: Ogm) {
    this.ogm.set(ogm);
    this.isValid.set(isValid);
  }
}
