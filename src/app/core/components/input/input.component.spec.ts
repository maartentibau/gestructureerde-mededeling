import { TestBed } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import { OGM_EMPTY, OgmService } from '../../services/ogm.service';

import { InputComponent, OgmInputChange } from './input.component';

describe('InputComponent', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('should create', async () => {
    const { container } = await setup();

    expect(container).toBeTruthy();
  });

  describe('rendering component', () => {
    it('should match snapshot with no @Input properties defined', async () => {
      // prepare
      const { fixture } = await setup();

      // act
      await fixture.whenStable();

      // check
      expect(fixture).toMatchSnapshot();
    });

    it('should match snapshot with validate set to false', async () => {
      // prepare
      const { fixture } = await setup({ validate: false, placeholderMessage: 'Placeholder message' });

      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });

    it('should match snapshot with validate set to true', async () => {
      // prepare
      const { fixture } = await setup({ validate: true, placeholderMessage: 'Placeholder message' });

      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('ngOnInit', () => {
    it('should call the init method of the ogmService', async () => {
      // prepare
      const { component, ogmService } = await setup();
      jest.spyOn(ogmService, 'init');

      // act
      component.ngOnInit();

      // check
      expect(ogmService.init).toHaveBeenCalled();
    });

    describe('ogm$', () => {
      let component: InputComponent;
      let ogmService: OgmService;

      describe('without validation', () => {
        beforeEach(async () => {
          ({ component, ogmService } = await setup({ validate: false }));

          jest.spyOn(ogmService, 'init');
          jest.spyOn(ogmService, 'generate');
          jest.spyOn(ogmService, 'clean');
          jest.spyOn(component.ogmInput, 'setValue');
          jest.spyOn(component.ogmInputChange, 'emit');
        });

        describe('invalid characters', () => {
          it('should NOT emit when only spaces are provided', async () => {
            // prepare
            const ogmInput: string = '     ';

            // act
            component.ogmInput.setValue(ogmInput);

            // check
            expect(component.ogmInputChange.emit).not.toHaveBeenCalled();
            expect(ogmService.init).toHaveBeenCalled();
            expect(ogmService.generate).not.toHaveBeenCalled();
            expect(ogmService.clean).toHaveBeenCalledWith(ogmInput);
            expect(component.ogmInput.setValue).toHaveBeenCalledWith('', { emitEvent: false });
          });

          it('should NOT emit when none numeric values are provided', async () => {
            // prepare
            const ogmInput: string = 'sdfzefsdf';

            // act
            component.ogmInput.setValue(ogmInput);

            // check
            expect(component.ogmInputChange.emit).not.toHaveBeenCalled();
            expect(ogmService.init).toHaveBeenCalled();
            expect(ogmService.generate).not.toHaveBeenCalled();
            expect(ogmService.clean).toHaveBeenCalledWith(ogmInput);
            expect(component.ogmInput.setValue).toHaveBeenCalledWith('', { emitEvent: false });
          });
        });

        it('should emit an initial OGM and not run validation', async () => {
          // prepare
          const ogmInitValue: string = OGM_EMPTY;
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmInitValue, isValid: null };

          jest.spyOn(ogmService, 'validate');

          // act
          component.ogmInput.setValue(null);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(ogmService.init).toHaveBeenCalled();
          expect(ogmService.generate).not.toHaveBeenCalledWith();
          expect(ogmService.clean).not.toHaveBeenCalled();
          expect(ogmService.validate).not.toHaveBeenCalled();
        });

        it('should emit a generated OGM and not run validation', () => {
          // prepare
          const ogmInput: string = '12345';
          const expectedOgmInputChange: OgmInputChange = { ogm: '+++123/4500/00012+++', isValid: null };

          jest.spyOn(ogmService, 'validate');

          // act
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(ogmService.init).toHaveBeenCalled();
          expect(ogmService.generate).toHaveBeenCalledWith(ogmInput, true);
          expect(ogmService.clean).not.toHaveBeenCalled();
          expect(ogmService.validate).not.toHaveBeenCalled();
        });
      });

      describe('with validation', () => {
        beforeEach(async () => {
          ({ component, ogmService } = await setup({ validate: true }));

          jest.spyOn(ogmService, 'init');
          jest.spyOn(ogmService, 'generate');
          jest.spyOn(ogmService, 'clean');
          jest.spyOn(ogmService, 'validate');
          jest.spyOn(component.ogmInputChange, 'emit');
        });

        it('should emit an initial OGM and NOT run validation when the input value is empty', () => {
          // prepare
          const ogmInitValue: string = '+++   /    /     +++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmInitValue, isValid: null };

          // act
          component.ogmInput.setValue(null);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(ogmService.init).toHaveBeenCalled();
          expect(ogmService.generate).not.toHaveBeenCalledWith();
          expect(ogmService.clean).toHaveBeenCalled();
          expect(ogmService.validate).not.toHaveBeenCalled();
        });

        it('should emit a formatted OGM and NOT run validation when the input is not 12 characters long', () => {
          // prepare
          const ogmInput: string = '12345';
          const ogmValue: string = '+++123/45  /     +++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmValue, isValid: null };

          // act
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(ogmService.init).toHaveBeenCalled();
          expect(ogmService.generate).not.toHaveBeenCalledWith();
          expect(ogmService.clean).toHaveBeenCalled();
          expect(ogmService.validate).not.toHaveBeenCalled();
        });

        it('should emit a formatted OGM and run validation and mark the OGM as invalid', () => {
          // prepare
          const ogmInput: string = '123456789012';
          const ogmValue: string = '+++123/4567/89012+++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmValue, isValid: false };

          // act
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(ogmService.init).toHaveBeenCalled();
          expect(ogmService.generate).not.toHaveBeenCalledWith();
          expect(ogmService.clean).toHaveBeenCalled();
          expect(ogmService.validate).toHaveBeenCalledWith(ogmValue);
        });

        it('should emit a formatted OGM and run validation and mark the OGM as valid', () => {
          // prepare
          const ogmInput: string = '165806877551';
          const ogmValue: string = '+++165/8068/77551+++';
          const expectedOgmInputChange: OgmInputChange = { ogm: ogmValue, isValid: true };

          // act
          component.ogmInput.setValue(ogmInput);

          // check
          expect(component.ogmInputChange.emit).toHaveBeenCalledWith(expectedOgmInputChange);
          expect(ogmService.init).toHaveBeenCalled();
          expect(ogmService.generate).not.toHaveBeenCalledWith();
          expect(ogmService.clean).toHaveBeenCalled();
          expect(ogmService.validate).toHaveBeenCalledWith(ogmValue);
        });
      });
    });
  });
});

const setup = async (
  { validate, placeholderMessage }: { validate?: boolean; placeholderMessage?: string } = {
    validate: false,
    placeholderMessage: '',
  },
) => {
  const f = new OgmService();
  jest.spyOn(f, 'init');

  const renderResult = await render(InputComponent, {
    inputs: { validate, placeholderMessage },
    providers: [{ provide: OgmService, useValue: f }],
  });

  const ogmService = TestBed.inject(OgmService);

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
    ogmService,
  };
};
