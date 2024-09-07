import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { Ogm } from '../../core/components/input/input.component';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmData } from '../../core/ogm.model';
import { OGM_EMPTY } from '../../core/services/ogm.service';

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
  ogm = input<string | null>(null);
  isValid = input<boolean | null>(null);
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
  validate = input<boolean>(false);
  placeholderMessage = input<string>('');
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
  refresh = input<boolean>(false);
  copyNumber = input<boolean>(false);
  copyOgm = input<boolean>(false);
  ogm = input<OgmData | null>(null);
}

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let titleService: Title;

  beforeEach(async () => {
    ({ fixture, component, titleService } = await setup());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering component', () => {
    it('should match snapshot', () => {
      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
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
      jest.spyOn(component.ogm, 'set');

      const ogmInputChange: Ogm = { ogm: OGM_EMPTY, isValid: null };

      // act
      component.handleOgmChange(ogmInputChange);

      // check
      expect(component.ogm.set).toHaveBeenCalledWith({ number: null, numberFormat: OGM_EMPTY });
    });

    it('should set ogm with the correct data and call next on ogm$ stream with the numberFormat', () => {
      // prepare
      const ogm: OgmData = { number: '120000000002', numberFormat: '+++120/0000/00002+++' };
      jest.spyOn(component.ogm, 'set');

      const ogmInputChange: Ogm = { ogm: ogm.numberFormat, isValid: true };

      // act
      component.handleOgmChange(ogmInputChange);

      // check
      expect(component.ogm.set).toHaveBeenCalledWith({ number: '120000000002', numberFormat: '+++120/0000/00002+++' });
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

const setup = async () => {
  const renderResult = await render(CreateComponent, {
    componentImports: [MockNumberComponent, MockInputComponent, MockControlsComponent, AsyncPipe],
    providers: [{ provide: MatSnackBar, useValue: { open: jest.fn() } }],
  });

  const titleService = TestBed.inject(Title);

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
    titleService,
  };
};
