import { TestBed } from '@angular/core/testing';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { OgmService } from '../../services/ogm.service';

import { InputComponent, Ogm } from './input.component';

describe('InputComponent', () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('should create', async () => {
    const { container } = await setup();

    expect(container).toBeTruthy();
  });

  describe.skip('rendering component', () => {
    it('should match snapshot with no @Input properties defined', async () => {
      // prepare
      const { fixture } = await setup();

      // act
      await fixture.whenStable();

      // check
      expect(fixture.nativeElement).toMatchSnapshot();
    });
    it('should match snapshot with validate set to false', async () => {
      // prepare
      const { fixture } = await setup({
        validate: false,
        placeholderMessage: 'Placeholder message',
      });

      // act
      fixture.detectChanges();

      // check
      expect(fixture.nativeElement).toMatchSnapshot();
    });
    it('should match snapshot with validate set to true', async () => {
      // prepare
      const { fixture } = await setup({
        validate: true,
        placeholderMessage: 'Placeholder message',
      });

      // act
      fixture.detectChanges();

      // check
      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });

  describe('handleInput', () => {
    let component: InputComponent;
    let ogmService: OgmService;
    let inputElement: HTMLElement;

    describe('without validation', () => {
      beforeEach(async () => {
        ({ component, ogmService } = await setup({ validate: false }));

        vi.spyOn(ogmService, 'generate');
        vi.spyOn(ogmService, 'clean');
        vi.spyOn(component.ogm, 'set');

        inputElement = screen.getByTestId('ogm-input');
      });

      describe('invalid characters', () => {
        it('should NOT set an ogm given invalid characters are used', async () => {
          // prepare
          const ogmInput: string = ' a b c,./;%$';

          // act
          await userEvent.type(inputElement, ogmInput);

          // check
          expect(ogmService.generate).not.toHaveBeenCalled();
          expect(ogmService.clean).toHaveBeenLastCalledWith('$');
          expect(component.ogm.set).not.toHaveBeenCalled();
        });
      });

      it('should emit a generated OGM and not run validation', async () => {
        // prepare
        const ogmInput: string = '12345';
        const expectedOgmInputChange: Ogm = { ogm: '+++123/4500/00012+++', isValid: null };

        vi.spyOn(ogmService, 'validate');

        // act
        await userEvent.type(inputElement, ogmInput);

        // check
        expect(ogmService.generate).toHaveBeenCalledWith(ogmInput, true);
        expect(ogmService.clean).not.toHaveBeenCalled();
        expect(ogmService.validate).not.toHaveBeenCalled();
        expect(component.ogm.set).toHaveBeenLastCalledWith(expectedOgmInputChange);
      });
    });

    describe('with validation', () => {
      beforeEach(async () => {
        ({ component, ogmService } = await setup({ validate: true }));

        vi.spyOn(ogmService, 'generate');
        vi.spyOn(ogmService, 'clean');
        vi.spyOn(ogmService, 'validate');
        vi.spyOn(component.ogm, 'set');

        inputElement = screen.getByTestId('ogm-input');
      });

      it('should emit a formatted OGM and NOT run validation when the input is not 12 characters long', async () => {
        // prepare
        const ogmInput: string = '12345';
        const ogmValue: string = '+++123/45  /     +++';
        const expectedOgmInputChange: Ogm = { ogm: ogmValue, isValid: null };

        // act
        await userEvent.type(inputElement, ogmInput);

        // check
        expect(ogmService.generate).not.toHaveBeenCalledWith();
        expect(ogmService.clean).toHaveBeenCalled();
        expect(ogmService.validate).not.toHaveBeenCalled();
        expect(component.ogm.set).toHaveBeenLastCalledWith(expectedOgmInputChange);
      });

      it('should emit a formatted OGM and run validation and mark the OGM as invalid', async () => {
        // prepare
        const ogmInput: string = '123456789012';
        const ogmValue: string = '+++123/4567/89012+++';
        const expectedOgmInputChange: Ogm = { ogm: ogmValue, isValid: false };

        // act
        await userEvent.type(inputElement, ogmInput);

        // check
        expect(ogmService.generate).not.toHaveBeenCalledWith();
        expect(ogmService.clean).toHaveBeenCalled();
        expect(ogmService.validate).toHaveBeenCalled();
        expect(component.ogm.set).toHaveBeenLastCalledWith(expectedOgmInputChange);
      });

      it('should emit a formatted OGM and run validation and mark the OGM as valid', async () => {
        // prepare
        const ogmInput: string = '165806877551';
        const ogmValue: string = '+++165/8068/77551+++';
        const expectedOgmInputChange: Ogm = { ogm: ogmValue, isValid: true };

        // act
        await userEvent.type(inputElement, ogmInput);

        // check
        expect(ogmService.generate).not.toHaveBeenCalledWith();
        expect(ogmService.clean).toHaveBeenCalled();
        expect(ogmService.validate).toHaveBeenCalledWith(ogmInput);
        expect(component.ogm.set).toHaveBeenLastCalledWith(expectedOgmInputChange);
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
  vi.spyOn(f, 'init');

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
