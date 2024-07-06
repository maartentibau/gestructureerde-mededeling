import { Injectable } from '@angular/core';

export const OGM_EMPTY = '+++   /    /     +++';

@Injectable({
  providedIn: 'root',
})
export class OgmService {
  init(): string {
    return OGM_EMPTY;
  }

  generate(start: string = '', format: boolean = false): string {
    let ogm = start ? start.toString().padEnd(10, '0') : this.generateRandomOgm();

    const modulo: number = Number(ogm) % 97;

    if (modulo === 0) {
      ogm += '97';
    } else {
      ogm += modulo.toString().padStart(2, '0');
    }

    return format === true ? this.format(ogm) : ogm;
  }

  format(ogm: string): string {
    return `+++${ogm.toString().substring(0, 3)}/${ogm.toString().substring(3, 7)}/${ogm.toString().substring(7)}+++`;
  }

  validate(ogm: string): boolean {
    const parsedOgm = ogm.replace(/[^0-9]/g, '');

    return this.generate(parsedOgm.substring(0, 10)) === parsedOgm;
  }

  clean(ogm: string): string {
    return ogm ? ogm.replace(/[^0-9]/g, '') : '';
  }

  generateRandomOgm(): string {
    return [...Array(10)].map(() => this.generateRandomNumber()).join('');
  }

  generateRandomNumber(min: number = 0, max: number = 9): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
