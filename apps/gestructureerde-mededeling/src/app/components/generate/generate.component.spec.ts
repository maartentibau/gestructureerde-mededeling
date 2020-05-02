import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateComponent } from './generate.component';
import { OgmService } from '../../core/services/ogm.service';
import { MaterialModule } from '../../core/material.module';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ScreenService } from '../../core/services/screen.service';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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

describe('GenerateComponent', () => {
  let component: GenerateComponent;
  let fixture: ComponentFixture<GenerateComponent>;
  let snackBar: MatSnackBar;
  let ogmService: OgmService;

  const number: string = '123456789012';
  const numberFormat: string = '+++123/4567/89012+++';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FontAwesomeModule],
      declarations: [GenerateComponent, MockNumberComponent, MockInputComponent],
      providers: [OgmService, ScreenService, MatSnackBar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateComponent);
    component = fixture.componentInstance;

    snackBar = TestBed.inject(MatSnackBar);
    ogmService = TestBed.inject(OgmService);

    jest.spyOn(ogmService, 'generate').mockReturnValueOnce(number);
    jest.spyOn(ogmService, 'format').mockReturnValueOnce(numberFormat);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
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

  describe('ngOnInit', () => {
    it('should call refresh method', () => {
      // prepare
      jest.spyOn(component, 'refresh');

      // act
      component.ngOnInit();

      // check
      expect(component.refresh).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroy method', () => {
      // prepare
      jest.spyOn(component.clipboard, 'destroy');

      // act
      component.ngOnDestroy();

      // check
      expect(component.clipboard.destroy).toHaveBeenCalled();
    });
  });

  describe('refresh', () => {
    beforeEach(() => {
      jest.spyOn(component, 'showSnackbarMessage');
    });

    it('should refresh the current OGM number and call showSnackbarMessage', () => {
      // prepare
      const message: string = 'Refresh!';
      const expectedResult = {
        number,
        numberFormat,
      };

      // act
      component.refresh(message);

      // check
      expect(component.showSnackbarMessage).toHaveBeenCalledWith(message);
      expect(ogmService.generate).toHaveBeenCalled();
      expect(ogmService.format).toHaveBeenCalled();
      expect(component.ogm).toStrictEqual(expectedResult);
    });
  });

  describe('copyToClipboard', () => {
    it('should call showSnackbarMessage method', () => {
      // prepare
      jest.spyOn(component, 'showSnackbarMessage');
      const message: string = 'Copy To Clipboard!';

      // act
      component.copyToClipboard(message);

      // check
      expect(component.showSnackbarMessage).toHaveBeenCalledWith(message);
    });
  });

  describe('showSnackbarMessage', () => {
    const snackBarConfig: MatSnackBarConfig = {
      panelClass: 'center-clipboard-text',
      verticalPosition: 'top',
      duration: 750,
    };

    beforeEach(() => {
      jest.spyOn(snackBar, 'open');
    });

    it('should call open when a message is provided', () => {
      // prepare
      const message: string = 'Hello World!';

      // act
      component.showSnackbarMessage(message);

      // check
      expect(snackBar.open).toHaveBeenCalledWith(message, '', snackBarConfig);
    });

    it('should NOT call open when no message is provided', () => {
      // prepare
      const message: string = '';

      // act
      component.showSnackbarMessage(message);

      // check
      expect(snackBar.open).not.toHaveBeenCalled();
    });
  });
});
