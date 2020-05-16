import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateComponent } from './generate.component';
import { OgmService } from '../../core/services/ogm.service';
import { MaterialModule } from '../../core/material.module';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ScreenService } from '../../core/services/screen.service';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OgmData } from '../../core/ogm.model';

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

@Component({
  selector: 'ogm-controls',
  template: `
    <div>{{ refresh | json }}</div>
    <div>{{ copyNumber | json }}</div>
    <div>{{ copyOgm | json }}</div>
    <div>{{ ogm | json }}</div>
  `,
})
class MockControlsComponent {
  @Input() refresh: boolean;
  @Input() copyNumber: boolean;
  @Input() copyOgm: boolean;
  @Input() ogm: OgmData;
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
      imports: [MaterialModule],
      declarations: [GenerateComponent, MockNumberComponent, MockInputComponent, MockControlsComponent],
      providers: [OgmService, MatSnackBar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateComponent);
    component = fixture.componentInstance;

    snackBar = TestBed.inject(MatSnackBar);
    ogmService = TestBed.inject(OgmService);

    jest.spyOn(ogmService, 'generate').mockReturnValueOnce(number);
    jest.spyOn(ogmService, 'format').mockReturnValueOnce(numberFormat);
    jest.spyOn(snackBar, 'open');
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
      jest.spyOn(component, 'refreshClickHandler');

      // act
      component.ngOnInit();

      // check
      expect(component.refreshClickHandler).toHaveBeenCalled();
    });
  });

  describe('refreshClickHandler', () => {
    it('should refresh the current OGM number', () => {
      // prepare
      const expectedResult = {
        number,
        numberFormat,
      };

      // act
      component.refreshClickHandler();

      // check
      expect(ogmService.generate).toHaveBeenCalled();
      expect(ogmService.format).toHaveBeenCalled();
      expect(component.ogm).toStrictEqual(expectedResult);
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

  describe('showSnackbarMessage', () => {
    const snackBarConfig: MatSnackBarConfig = {
      panelClass: 'center-clipboard-text',
      verticalPosition: 'top',
      duration: 750,
    };

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
