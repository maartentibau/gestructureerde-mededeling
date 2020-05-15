import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComponent } from './create.component';
import { OgmService } from '../../core/services/ogm.service';
import { Component, Input } from '@angular/core';
import { OgmInputChange } from '../../core/components/ogm-input/ogm-input.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../core/material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { GenerateComponent } from '../generate/generate.component';
import { ScreenService } from '../../core/services/screen.service';

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

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let snackBar: MatSnackBar;
  let ogmService: OgmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FontAwesomeModule],
      declarations: [CreateComponent, MockNumberComponent, MockInputComponent],
      providers: [OgmService, ScreenService, MatSnackBar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;

    snackBar = TestBed.inject(MatSnackBar);
    ogmService = TestBed.inject(OgmService);
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
    it('should call next on ogm$ stream', () => {
      // prepare
      jest.spyOn(component.ogm$, 'next');

      const ogmInputChange: OgmInputChange = { ogm: '54321', isValid: undefined };

      // act
      component.ogmInputChangeHandler(ogmInputChange);

      // check
      expect(component.ogm$.next).toHaveBeenCalledWith('54321');
    });
  });
});
