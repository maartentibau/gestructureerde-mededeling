import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { Title } from '@angular/platform-browser';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { render } from '@testing-library/angular';
import { ScreenService } from '../../services/screen.service';

import { ControlsComponent } from './controls.component';

@Component({
  imports: [JsonPipe],
  selector: 'fa-icon',
  template: ` <div>{{ icon | json }}</div> `,
})
class MockFaIconComponent {
  icon = input<string | string[] | undefined>();
}

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    ({ component, fixture } = await setup());
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe.skip('rendering component', () => {
    it('should match snapshot', () => {
      // act
      fixture.detectChanges();

      // check
      expect(fixture.nativeElement).toMatchSnapshot();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroy method', () => {
      // prepare
      vi.spyOn(component.clipboard, 'destroy');

      // act
      component.ngOnDestroy();

      // check
      expect(component.clipboard.destroy).toHaveBeenCalled();
    });
  });

  describe('refreshClickHandler', () => {
    it('should emit refreshClick', () => {
      // prepare
      vi.spyOn(component.refreshClick, 'emit');

      // act
      component.refreshClickHandler();

      // check
      expect(component.refreshClick.emit).toHaveBeenCalled();
    });
  });

  describe('copyNumberClickHandler', () => {
    it('should emit refreshClick', () => {
      // prepare
      const message: string = 'Nummer gekopieerd naar klembord';
      vi.spyOn(component.copyNumberClick, 'emit');

      // act
      component.copyNumberClickHandler();

      // check
      expect(component.copyNumberClick.emit).toHaveBeenCalledWith(message);
    });
  });

  describe('copyOgmClickHandler', () => {
    it('should emit refreshClick', () => {
      // prepare
      const message: string = 'Mededeling gekopieerd naar klembord';
      vi.spyOn(component.copyOgmClick, 'emit');

      // act
      component.copyOgmClickHandler();

      // check
      expect(component.copyOgmClick.emit).toHaveBeenCalledWith(message);
    });
  });
});

const setup = async () => {
  const renderResult = await render(ControlsComponent, {
    componentImports: [AsyncPipe, MatButtonModule, MockFaIconComponent],
    providers: [
      { provide: ScreenService, useValue: { observerBreakpoints: () => ({ pipe: vi.fn() }) } },
      { provide: FaIconLibrary, useValue: { addIcons: vi.fn() } },
    ],
  });

  const titleService = TestBed.inject(Title);

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
    titleService,
  };
};
