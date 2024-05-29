import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { OgmInputChange } from '../../core/components/input/input.component';
import { DEFAULT_TITLE } from '../../core/core.constants';

import { ValidateComponent } from './validate.component';

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

describe('ValidateComponent', () => {
  let component: ValidateComponent;
  let fixture: ComponentFixture<ValidateComponent>;
  let titleService: Title;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateComponent],
    })
      .overrideComponent(ValidateComponent, { set: { imports: [MockNumberComponent, MockInputComponent, AsyncPipe] } })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateComponent);
    component = fixture.componentInstance;

    titleService = TestBed.inject(Title);
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
      // expect(fixture).toMatchSnapshot();
    });
  });

  describe('ogmInputChangeHandler', () => {
    it('should call next on ogm$ and isValid$ stream', () => {
      // prepare
      jest.spyOn(component.ogm$, 'next');
      jest.spyOn(component.isValid$, 'next');

      const ogmInputChange: OgmInputChange = { ogm: '12345', isValid: false };

      // act
      component.ogmInputChangeHandler(ogmInputChange);

      // check
      expect(component.ogm$.next).toHaveBeenCalledWith('12345');
      expect(component.isValid$.next).toHaveBeenCalledWith(false);
    });
  });
});
