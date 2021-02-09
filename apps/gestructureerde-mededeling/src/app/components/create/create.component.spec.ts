import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { DEFAULT_TITLE } from '../../core/core.constants';

import { CreateComponent } from './create.component';
import { OgmService } from '../../core/services/ogm.service';
import { Component, Input } from '@angular/core';
import { OgmInputChange } from '../../core/components/input/input.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from '../../core/material.module';
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

describe('CreateComponent', () => {
  let component: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;
  let snackBar: MatSnackBar;
  let ogmService: OgmService;
  let titleService: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [CreateComponent, MockNumberComponent, MockInputComponent, MockControlsComponent],
      providers: [OgmService, MatSnackBar],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComponent);
    component = fixture.componentInstance;

    snackBar = TestBed.inject(MatSnackBar);
    ogmService = TestBed.inject(OgmService);
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
      const ogm: OgmData = undefined;
      jest.spyOn(component.ogm$, 'next');

      const ogmInputChange: OgmInputChange = { ogm: '+++   /    /     +++', isValid: undefined };

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
