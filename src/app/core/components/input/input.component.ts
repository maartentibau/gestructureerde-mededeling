import { ChangeDetectionStrategy, Component, inject, input, model } from '@angular/core';
import { OGM_EMPTY, OgmService } from '../../services/ogm.service';

export type Ogm = {
  ogm: string | null;
  isValid: boolean | null;
};

@Component({
  standalone: true,
  selector: 'ogm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  readonly validate = input<boolean>(false);
  readonly placeholderMessage = input<string>('');

  readonly ogm = model<Ogm>({ ogm: null, isValid: null });

  #ogmService = inject(OgmService);

  handleInput(event: Event): void {
    let inputValue = (event.target as HTMLInputElement).value;
    const hasSpaces: RegExp = new RegExp('[\\s]');

    if (isNaN(Number(inputValue)) || hasSpaces.test(inputValue)) {
      (event.target as HTMLInputElement).value = this.#ogmService.clean(inputValue);
      return;
    }

    this.ogm.set(this.generateOgm(inputValue, this.validate()));
  }

  private generateOgm(value: string, validate: boolean): Ogm {
    let ogm = '';
    let isValid = null;

    if (validate) {
      ogm = value ? this.#ogmService.format(value.toString().padEnd(12, ' ')) : OGM_EMPTY;

      const ogmNumber = this.#ogmService.clean(ogm);
      isValid = ogmNumber.length === 12 ? this.#ogmService.validate(ogmNumber) : null;
    } else {
      ogm = value ? this.#ogmService.generate(value, true) : OGM_EMPTY;
    }

    return { ogm, isValid };
  }
}
