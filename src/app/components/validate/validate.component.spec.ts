import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { Ogm } from '../../core/components/input/input.component';
import { DEFAULT_TITLE } from '../../core/core.constants';

import { ValidateComponent } from './validate.component';

@Component({
    imports: [JsonPipe],
    selector: 'ogm-number',
    template: `
    <div>{{ ogm | json }}</div>
    <div>{{ isValid | json }}</div>
  `
})
class MockNumberComponent {
  ogm = input<string | null>(null);
  isValid = input<boolean | null>(null);
}

@Component({
    imports: [JsonPipe],
    selector: 'ogm-input',
    template: `
    <div>{{ validate | json }}</div>
    <div>{{ placeholderMessage | json }}</div>
  `
})
class MockInputComponent {
  validate = input<boolean>(false);
  placeholderMessage = input<string>('');
}

describe('ValidateComponent', () => {
  let component: ValidateComponent;
  let fixture: ComponentFixture<ValidateComponent>;
  let titleService: Title;

  beforeEach(async () => {
    ({ component, fixture, titleService } = await setup());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('constructor', () => {
    it('set the correct HTML title', () => {
      // prepare
      const title: string = `${DEFAULT_TITLE} - Controleer een gestructureerde mededeling`;
      jest.spyOn(titleService, 'setTitle');

      // act
      TestBed.createComponent(ValidateComponent);

      // check
      expect(titleService.setTitle).toHaveBeenCalledWith(title);
    });
  });

  describe('rendering component', () => {
    it('should match snapshot', () => {
      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('ogmInputChangeHandler', () => {
    it('should call next on ogm$ and isValid$ stream', () => {
      // prepare
      jest.spyOn(component.ogm, 'set');
      jest.spyOn(component.isValid, 'set');

      const ogmInputChange: Ogm = { ogm: '12345', isValid: false };

      // act
      component.handleOgmChange(ogmInputChange);

      // check
      expect(component.ogm.set).toHaveBeenCalledWith('12345');
      expect(component.isValid.set).toHaveBeenCalledWith(false);
    });
  });
});

const setup = async () => {
  const renderResult = await render(ValidateComponent, {
    componentImports: [MockNumberComponent, MockInputComponent, AsyncPipe],
    providers: [{ provide: MatSnackBar, useValue: { open: jest.fn() } }],
  });

  const titleService = TestBed.inject(Title);

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
    titleService,
  };
};
