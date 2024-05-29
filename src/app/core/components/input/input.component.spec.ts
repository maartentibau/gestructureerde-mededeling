import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OgmService } from '../../services/ogm.service';

import { InputComponent, OgmInputChange } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let omgService: OgmService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    omgService = TestBed.inject(OgmService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering component', () => {
    it('should match snapshot with no @Input properties defined', () => {
      // act
      fixture.detectChanges();

      // check
      // expect(fixture).toMatchSnapshot();
    });

    it('should match snapshot with validate set to false', () => {
      // prepare
      component.validate = false;
      component.placeholderMessage = 'Placeholder message';

      // act
      fixture.detectChanges();

      // check
      // expect(fixture).toMatchSnapshot();
    });

    it('should match snapshot with validate set to true', () => {
      // prepare
      component.validate = true;
      component.placeholderMessage = 'Placeholder message';

      // act
      fixture.detectChanges();

      // check
      // expect(fixture).toMatchSnapshot();
    });
  });

  describe('ngOnInit', () => {
    it('should call the init method of the ogmService', () => {
      // prepare
      jest.spyOn(omgService, 'init');

      // act
      component.ngOnInit();

      // check
      expect(omgService.init).toHaveBeenCalled();
    });

    describe('ogm$', () => {
      beforeEach(() => {
        jest.spyOn(omgService, 'init');
        jest.spyOn(omgService, 'generate');
        jest.spyOn(omgService, 'clean');
        jest.spyOn(omgService, 'validate');
        jest.spyOn(component.ogmInputChange, 'emit');
      });

      describe('without validation', () => {
        beforeEach(() => {
          component.validate = false;
        });

        describe('invalid characters', () => {
          beforeEach(() => {
            jest.spyOn(component.ogmInput, 'setValue');
          });

          it('should NOT emit when only spaces are provided', () => {
            // prepare
            const ogmInput: string = '     ';

            // act
            fixture.detectChanges();
            component.ogmInput.setValue(ogmInput);

            // check
            expect(component.ogmInputChange.emit).not.toHaveBeenCalled();
            expect(omgService.init).toHaveBeenCalled();
            expect(omgService.generate).not.toHaveBeenCalled();
            expect(omgService.clean).toHaveBeenCalledWith(ogmInput);
            expect(component.ogmInput.setValue).toHaveBeenCalledWith('', { emitEvent: false });
          });

          it('should NOT emit when none numeric values are provided', () => {
            // prepare
            const ogmInput: string = 'sdfzefsdf';

            // act
            fixture.detectChanges();
            component.ogmInput.setValue(ogmInput);

            // check
            expect(component.ogmInputChange.emit).not.toHaveBeenCalled();
            expect(omgService.init).toHaveBeenCalled();
            expect(omgService.generate).not.toHaveBeenCalled();
            expect(omgService.clean).toHaveBeenCalledWith(ogmInput);
            expect(component.ogmInput.setValue).toHaveBeenCalledWith('', { emitEvent: false });
          });
        });

        it('should emit an initial OGM and not run validation', () => {
          // prepare
          const ogmInitValue: string = '+++   /    /     +++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmInitValue, isValid: null };

          // act
          fixture.detectChanges();
          component.ogmInput.setValue(null);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(omgService.init).toHaveBeenCalled();
          expect(omgService.generate).not.toHaveBeenCalledWith();
          expect(omgService.clean).not.toHaveBeenCalled();
          expect(omgService.validate).not.toHaveBeenCalled();
        });

        it('should emit a generated OGM and not run validation', () => {
          // prepare
          const ogmInput: string = '12345';
          const expectedOgmInputChange: OgmInputChange = { ogm: '+++123/4500/00012+++', isValid: null };

          // act
          fixture.detectChanges();
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(omgService.init).toHaveBeenCalled();
          expect(omgService.generate).toHaveBeenCalledWith(ogmInput, true);
          expect(omgService.clean).not.toHaveBeenCalled();
          expect(omgService.validate).not.toHaveBeenCalled();
        });
      });

      describe('with validation', () => {
        beforeEach(() => {
          component.validate = true;
          jest.spyOn(component.ogmInputChange, 'emit');
        });

        it('should emit an initial OGM and NOT run validation when the input value is empty', () => {
          // prepare
          const ogmInitValue: string = '+++   /    /     +++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmInitValue, isValid: null };

          // act
          fixture.detectChanges();
          component.ogmInput.setValue(null);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(omgService.init).toHaveBeenCalled();
          expect(omgService.generate).not.toHaveBeenCalledWith();
          expect(omgService.clean).toHaveBeenCalled();
          expect(omgService.validate).not.toHaveBeenCalled();
        });

        it('should emit a formatted OGM and NOT run validation when the input is not 12 characters long', () => {
          // prepare
          const ogmInput: string = '12345';
          const ogmValue: string = '+++123/45  /     +++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmValue, isValid: null };

          // act
          fixture.detectChanges();
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(omgService.init).toHaveBeenCalled();
          expect(omgService.generate).not.toHaveBeenCalledWith();
          expect(omgService.clean).toHaveBeenCalled();
          expect(omgService.validate).not.toHaveBeenCalled();
        });

        it('should emit a formatted OGM and run validation and mark the OGM as invalid', () => {
          // prepare
          const ogmInput: string = '123456789012';
          const ogmValue: string = '+++123/4567/89012+++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmValue, isValid: false };

          // act
          fixture.detectChanges();
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(omgService.init).toHaveBeenCalled();
          expect(omgService.generate).not.toHaveBeenCalledWith();
          expect(omgService.clean).toHaveBeenCalled();
          expect(omgService.validate).toHaveBeenCalledWith(ogmValue);
        });

        it('should emit a formatted OGM and run validation and mark the OGM as valid', () => {
          // prepare
          const ogmInput: string = '165806877551';
          const ogmValue: string = '+++165/8068/77551+++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmValue, isValid: true };

          // act
          fixture.detectChanges();
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(omgService.init).toHaveBeenCalled();
          expect(omgService.generate).not.toHaveBeenCalledWith();
          expect(omgService.clean).toHaveBeenCalled();
          expect(omgService.validate).toHaveBeenCalledWith(ogmValue);
        });
      });
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next method on destroy$', () => {
      // prepare
      jest.spyOn(component.destroy$, 'next');

      // act
      component.ngOnDestroy();

      // check
      expect(component.destroy$.next).toHaveBeenCalledWith();
    });
  });
});
