import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { OgmInputChange } from '../../core/components/input/input.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmData } from '../../core/ogm.model';

import { CreateComponent } from './create.component';

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'ogm-number',
  template: `
    <div>{{ ogm | json }}</div>
    <div>{{ isValid | json }}</div>
  `,
})
class MockNumberComponent {
  @Input() ogm: string | undefined;
  @Input() isValid: boolean | undefined;
}

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'ogm-input',
  template: `
    <div>{{ validate | json }}</div>
    <div>{{ placeholderMessage | json }}</div>
  `,
})
class MockInputComponent {
  @Input() validate: boolean | undefined;
  @Input() placeholderMessage: string | undefined;
}

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'ogm-controls',
  template: `
    <div>{{ refresh | json }}</div>
    <div>{{ copyNumber | json }}</div>
    <div>{{ copyOgm | json }}</div>
    <div>{{ ogm | json }}</div>
  `,
})
class MockControlsComponent {
  @Input() refresh: boolean | undefined;
  @Input() copyNumber: boolean | undefined;
  @Input() copyOgm: boolean | undefined;
  @Input() ogm: OgmData | undefined;
}

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateComponent],
      providers: [{ provide: MatSnackBar, useValue: { open: jest.fn() } }],
    })
      .overrideComponent(CreateComponent, {
        set: {
          imports: [MockNumberComponent, MockInputComponent, MockControlsComponent, AsyncPipe, NgIf],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;

    titleService = TestBed.inject(Title);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering component', () => {
    it('should match snapshot', () => {
      // act
      fixture.detectChanges();

      // check
      // expect(fixture).toMatchSnapshot();
    });
  });

  describe('constructor', () => {
    it('set the correct HTML title', () => {
      // prepare
      const title: string = `${DEFAULT_TITLE} - Zelf een gestructureerde mededeling maken`;
      jest.spyOn(titleService, 'setTitle');

      // act
      TestBed.createComponent(CreateComponent);

      // check
      expect(titleService.setTitle).toHaveBeenCalledWith(title);
    });
  });

  describe('ogmInputChangeHandler', () => {
    it('should set ogm value to undefined and call next on ogm$ stream with init numberFormat', () => {
      // prepare
      jest.spyOn(component.ogm$, 'next');

      const ogmInputChange: OgmInputChange = { ogm: '+++   /    /     +++', isValid: null };

      // act
      component.ogmInputChangeHandler(ogmInputChange);

      // check
      expect(component.ogm).toBeUndefined();
      expect(component.ogm$.next).toHaveBeenCalledWith(ogmInputChange.ogm);
    });

    it('should set ogm with the correct data and call next on ogm$ stream with the numberFormat', () => {
      // prepare
      const ogm: OgmData = { number: '120000000002', numberFormat: '+++120/0000/00002+++' };
      jest.spyOn(component.ogm$, 'next');

      const ogmInputChange: OgmInputChange = { ogm: ogm.numberFormat, isValid: true };

      // act
      component.ogmInputChangeHandler(ogmInputChange);

      // check
      expect(component.ogm).toStrictEqual(ogm);
      expect(component.ogm$.next).toHaveBeenCalledWith(ogmInputChange.ogm);
    });
  });

  describe('Copy number or OGM', () => {
    beforeEach(() => {
      jest.spyOn(component, 'showSnackbarMessage');
    });

    describe('copyNumberClickHandler', () => {
      it('should the correct copy message when called', () => {
        // prepare
        const message: string = 'Copy number!';

        // act
        component.copyNumberClickHandler(message);

        // check
        expect(component.showSnackbarMessage).toHaveBeenCalledWith(message);
      });
    });

    describe('copyOgmClickHandler', () => {
      it('should the correct copy message when called', () => {
        // prepare
        const message: string = 'Copy OGM!';

        // act
        component.copyOgmClickHandler(message);

        // check
        expect(component.showSnackbarMessage).toHaveBeenCalledWith(message);
      });
    });
  });
});
