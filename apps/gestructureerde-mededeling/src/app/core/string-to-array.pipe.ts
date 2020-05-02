import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringToArray',
})
export class StringToArrayPipe implements PipeTransform {
  transform(value: string): string[] {
    if ((value && typeof value === 'string') || typeof value === 'number') {
      return Array.from(String(value));
    }

    return [];
  }
}
