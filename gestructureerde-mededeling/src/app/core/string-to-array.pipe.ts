import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'stringToArray',
})
export class StringToArrayPipe implements PipeTransform {
  transform(value: number | string | null | undefined): string[] {
    if ((value && typeof value === 'string') || typeof value === 'number') {
      return Array.from(String(value));
    }

    return [];
  }
}
