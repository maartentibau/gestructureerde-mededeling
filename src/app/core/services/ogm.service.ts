import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OgmService {
  init(): string {
    return this.format(new Array(12).fill(' ').join(''));
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
    return `+++${ogm.toString().substr(0, 3)}/${ogm.toString().substr(3, 4)}/${ogm.toString().substr(7)}+++`;
  }

  validate(ogm: string): boolean {
    const parsedOgm = ogm.replace(/[^0-9]/g, '');

    return this.generate(parsedOgm.substr(0, 10)) === parsedOgm;
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
