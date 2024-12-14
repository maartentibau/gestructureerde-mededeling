import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { provideRouter, RouterLink } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { render } from '@testing-library/angular';
import { ScreenService } from '../../core/services/screen.service';

import { MainComponent } from './main.component';

@Component({
    imports: [JsonPipe],
    selector: 'fa-icon',
    template: ` <div>{{ icon | json }}</div> `
})
class MockFaIconComponent {
  icon = input<string | string[] | undefined>();
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    ({ component, fixture } = await setup());
  });

  describe('create & render', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render', () => {
      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });
  });
});

const setup = async () => {
  const renderResult = await render(MainComponent, {
    componentImports: [AsyncPipe, RouterLink, MockFaIconComponent, MatButtonModule],
    providers: [
      { provide: ScreenService, useValue: { observerBreakpoints: () => ({ pipe: jest.fn() }) } },
      { provide: FaIconLibrary, useValue: { addIcons: jest.fn() } },
      provideRouter([]),
    ],
  });

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
  };
};
