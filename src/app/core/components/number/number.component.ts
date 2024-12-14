import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { StringToArrayPipe } from '../../string-to-array.pipe';

@Component({
    imports: [NgClass, StringToArrayPipe],
    selector: 'ogm-number',
    templateUrl: './number.component.html',
    styleUrls: ['./number.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberComponent {
  ogm = input<string | null>(null);
  isValid = input<boolean | null>(null);
}
