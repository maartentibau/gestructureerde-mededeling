import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateComponent } from './validate.component';
import { OgmService } from '../../core/services/ogm.service';
import { Component, Input } from '@angular/core';
import { OgmInputChange } from '../../core/components/input/input.component';

@Component({
  selector: 'ogm-number',
  template: `
    <div>{{ ogm | json }}</div>
    <div>{{ isValid | json }}</div>
  `,
})
class MockNumberComponent {
  @Input() ogm: string;
  @Input() isValid: boolean;
}

@Component({
  selector: 'ogm-input',
  template: `
    <div>{{ validate | json }}</div>
    <div>{{ placeholderMessage | json }}</div>
  `,
})
class MockInputComponent {
  @Input() validate: boolean;
  @Input() placeholderMessage: string;
}

describe('ValidateComponent', () => {
  let component: ValidateComponent;
  let fixture: ComponentFixture<ValidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ValidateComponent, MockNumberComponent, MockInputComponent],
      providers: [OgmService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateComponent);
    component = fixture.componentInstance;
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
