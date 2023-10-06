import { NgClass, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { StringToArrayPipe } from '../../string-to-array.pipe';

@Component({
  standalone: true,
  imports: [NgClass, NgFor, StringToArrayPipe],
  selector: 'ogm-number',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberComponent {
  @Input() ogm: string | null | undefined;
  @Input() isValid!: boolean | null;
}
