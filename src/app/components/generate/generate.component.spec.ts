import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { DEFAULT_TITLE } from '../../core/core.constants';
import { OgmData } from '../../core/ogm.model';
import { OgmService } from '../../core/services/ogm.service';

import { GenerateComponent } from './generate.component';

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

describe('GenerateComponent', () => {
  let component: GenerateComponent;
  let fixture: ComponentFixture<GenerateComponent>;
  let snackBar: MatSnackBar;
  let ogmService: OgmService;
  let titleService: Title;

  const number: string = '123456789012';
  const numberFormat: string = '+++123/4567/89012+++';

  beforeEach(async () => {
    ({ component, fixture, snackBar, ogmService, titleService } = await setup());
  });

  beforeEach(() => {
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

  describe('constructor', () => {
    it('set the correct HTML title', () => {
      // prepare
      const title: string = `${DEFAULT_TITLE} - Genereer een willekeurig gestructureerde mededeling`;
      jest.spyOn(titleService, 'setTitle');

      // act
      TestBed.createComponent(GenerateComponent);

      // check
      expect(titleService.setTitle).toHaveBeenCalledWith(title);
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
      expect(component.ogm()).toStrictEqual(expectedResult);
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

const setup = async () => {
  const renderResult = await render(GenerateComponent, {
    componentImports: [MockNumberComponent, MockControlsComponent, AsyncPipe],
    providers: [{ provide: MatSnackBar, useValue: { open: jest.fn() } }],
  });

  const snackBar = TestBed.inject(MatSnackBar);
  const ogmService = TestBed.inject(OgmService);
  const titleService = TestBed.inject(Title);

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
    snackBar,
    ogmService,
    titleService,
  };
};
