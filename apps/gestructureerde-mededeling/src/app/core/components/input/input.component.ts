import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { OgmService } from '../../services/ogm.service';

export interface OgmInputChange {
  ogm: string;
  isValid: boolean;
}

@Component({
  selector: 'ogm-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  @Input() validate: boolean;
  @Input() placeholderMessage: string;

  @Output() ogmInputChange: EventEmitter<OgmInputChange> = new EventEmitter<undefined>();

  readonly ogmInput: FormControl;
  readonly destroy$: Subject<void>;

  ogm$: Observable<string>;

  constructor(private ogmService: OgmService) {
    this.ogmInput = new FormControl(null);
    this.destroy$ = new Subject<void>();
  }

  ngOnInit() {
    const ogmInitValue: string = this.ogmService.init();
    const hasSpaces: RegExp = new RegExp('[\\s]');

    const omgInputChanges$ = this.ogmInput.valueChanges.pipe(
      filter((value) => {
        if (isNaN(Number(value)) || hasSpaces.test(value)) {
          const cleanValue = this.ogmService.clean(value);
          this.ogmInput.setValue(cleanValue, { emitEvent: false });
          return false;
        }

        return true;
      })
    );

    if (this.validate) {
      this.ogm$ = omgInputChanges$.pipe(map((value) => this.ogmService.format(value.toString().padEnd(12, ' '))));
    } else {
      this.ogm$ = omgInputChanges$.pipe(map((value) => (value ? this.ogmService.generate(value, true) : ogmInitValue)));
    }

    this.ogm$
      .pipe(
        tap((ogm: string) => {
          let isValid;

          if (this.validate) {
            const ogmNumber = this.ogmService.clean(ogm);
            isValid = ogmNumber.length === 12 ? this.ogmService.validate(ogm) : undefined;
          }

          this.ogmInputChange.emit({ ogm, isValid });
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
