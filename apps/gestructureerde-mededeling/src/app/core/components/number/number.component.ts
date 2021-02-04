import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'ogm-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberComponent {
  @Input() ogm: string | null | undefined;
  @Input() isValid: boolean | null | undefined;
}
