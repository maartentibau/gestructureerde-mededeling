import { render } from '@testing-library/angular';

import { NumberComponent } from './number.component';

describe('NumberComponent', () => {
  it('should create', async () => {
    const { component } = await setup();

    expect(component).toBeTruthy();
  });

  describe.skip('rendering component', () => {
    it('should match snapshot with no @Input properties defined', async () => {
      const { fixture } = await setup();

      // act
      fixture.detectChanges();

      // check
      expect(fixture.nativeElement).toMatchSnapshot();
    });
    it('should match snapshot with isValid set to false', async () => {
      // prepare
      const { fixture } = await setup({ ogm: '+++123/4567/89012+++', isValid: false });

      // act
      fixture.detectChanges();

      // check
      expect(fixture.nativeElement).toMatchSnapshot();
    });
    it('should match snapshot with isValid set to true', async () => {
      // prepare
      const { fixture } = await setup({ ogm: '+++123/4567/89012+++', isValid: true });

      // act
      fixture.detectChanges();

      // check
      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });
});

const setup = async (
  { ogm, isValid }: { ogm?: string | null; isValid?: boolean | null } = {
    ogm: null,
    isValid: null,
  },
) => {
  const renderResult = await render(NumberComponent, {
    inputs: { ogm, isValid },
  });

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
  };
};
