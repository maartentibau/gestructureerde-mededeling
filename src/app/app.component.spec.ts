import { JsonPipe, NgStyle } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { Title } from '@angular/platform-browser';
import { provideRouter, RouterLink, RouterOutlet } from '@angular/router';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { render } from '@testing-library/angular';
import { AppComponent } from './app.component';

@Component({
  standalone: true,
  selector: 'ogm-navigation',
  template: '',
})
class MockNavigationComponent {}

@Component({
  imports: [JsonPipe],
  selector: 'fa-icon',
  template: ` <div>{{ icon | json }}</div> `,
})
class MockFaIconComponent {
  icon = input<string | string[] | undefined>();
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    ({ component, fixture } = await setup());
  });

  it('should create the app', () => {
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
});

const setup = async () => {
  const renderResult = await render(AppComponent, {
    componentImports: [
      MockNavigationComponent,
      RouterLink,
      MatCardModule,
      MockFaIconComponent,
      NgStyle,
      RouterOutlet,
    ],
    providers: [
      { provide: FaConfig, useValue: { fixedWidth: null } },
      { provide: FaIconLibrary, useValue: { addIcons: vi.fn() } },
      provideRouter([]),
    ],
  });

  const titleService = TestBed.inject(Title);

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
    titleService,
  };
};
