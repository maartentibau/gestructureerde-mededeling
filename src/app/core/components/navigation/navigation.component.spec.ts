import { Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideRouter, RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { render } from '@testing-library/angular';
import { TestScheduler } from 'rxjs/testing';
import { ScreenService } from '../../services/screen.service';
import { APP_NAVIGATION, NavigationComponent } from './navigation.component';
import { NavigationEntity, NavigationLabel } from './navigation.model';

@Component({
  imports: [JsonPipe],
  selector: 'fa-icon',
  template: ` <div>{{ icon | json }}</div> `,
})
class MockFaIconComponent {
  icon = input<string | string[] | undefined>();
}

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  let screenService: ScreenService;
  let testScheduler: TestScheduler;

  beforeEach(async () => {
    ({ component, fixture, screenService } = await setup());

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it.skip('should create', () => {
    // act
    fixture.detectChanges();

    // assert
    expect(component).toBeTruthy();
    expect(fixture.nativeElement).toMatchSnapshot();
  });

  describe('isSmallScreen$', () => {
    [
      { breakpoint: Breakpoints.XSmall, smallScreen: true },
      { breakpoint: Breakpoints.Small, smallScreen: true },
      { breakpoint: Breakpoints.Medium, smallScreen: false },
      { breakpoint: Breakpoints.Large, smallScreen: false },
      { breakpoint: Breakpoints.XLarge, smallScreen: false },
    ].forEach(({ breakpoint, smallScreen }) => {
      it(`should emit ${smallScreen} when ${breakpoint}`, () => {
        testScheduler.run(({ cold, expectObservable }) => {
          // prepare
          const breakPoints$ = cold('a', { a: { [breakpoint]: true } });
          vi.spyOn(screenService, 'observerBreakpoints').mockReturnValue(breakPoints$);

          // Because the component uses the screenService.observerBreakpoints stream in it's constructor
          // we're ensuring the mocks are set up before creating the component.
          // act
          fixture = TestBed.createComponent(NavigationComponent);
          component = fixture.componentInstance;

          // check
          expectObservable(component.isSmallScreen$).toBe('a', { a: smallScreen });
        });
      });
    });
  });

  describe('navigation$', () => {
    [
      { breakpoint: Breakpoints.XSmall, labelSize: NavigationLabel.Short },
      { breakpoint: Breakpoints.Small, labelSize: NavigationLabel.Short },
      { breakpoint: Breakpoints.Medium, labelSize: NavigationLabel.Short },
      { breakpoint: Breakpoints.Large, labelSize: NavigationLabel.Long },
      { breakpoint: Breakpoints.XLarge, labelSize: NavigationLabel.Long },
    ].forEach(({ breakpoint, labelSize }) => {
      it(`should use label ${labelSize} when ${breakpoint}`, () => {
        testScheduler.run(({ cold, expectObservable }) => {
          // prepare
          const expectedNavigation = APP_NAVIGATION.map((navigation: NavigationEntity) => ({
            ...navigation,
            label: navigation.label[labelSize],
          }));

          const breakPoints$ = cold('a', { a: { [breakpoint]: true } });
          vi.spyOn(screenService, 'observerBreakpoints').mockReturnValue(breakPoints$);

          // Because the component uses the screenService.observerBreakpoints stream in it's constructor
          // we're ensuring the mocks are set up before creating the component.
          // act
          fixture = TestBed.createComponent(NavigationComponent);
          component = fixture.componentInstance;

          // check
          expectObservable(component.navigation$).toBe('a', { a: expectedNavigation });
        });
      });
    });
  });

  describe('appTitle$', () => {
    it.each`
      breakpoint            | title
      ${Breakpoints.XSmall} | ${'OGM'}
      ${Breakpoints.Small}  | ${'Gestructureerde Mededeling - OGM'}
      ${Breakpoints.Medium} | ${'Gestructureerde Mededeling - OGM'}
      ${Breakpoints.Large}  | ${'Gestructureerde Mededeling - OGM'}
      ${Breakpoints.XLarge} | ${'Gestructureerde Mededeling - OGM'}
    `(`should have $title with given $breakpoint`, ({ breakpoint, title }) => {
      testScheduler.run(({ cold, expectObservable }) => {
        // prepare
        const breakPoints$ = cold('a', { a: { [breakpoint]: true } });
        vi.spyOn(screenService, 'observerBreakpoints').mockReturnValue(breakPoints$);

        // Because the component uses the screenService.observerBreakpoints stream in it's constructor
        // we're ensuring the mocks are set up before creating the component.
        // act
        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;

        // check
        expectObservable(component.appTitle$).toBe('a', { a: title });
      });
    });
  });
});

const setup = async () => {
  const renderResult = await render(NavigationComponent, {
    componentImports: [
      MatToolbarModule,
      AsyncPipe,
      MatButtonModule,
      MockFaIconComponent,
      RouterLink,
      RouterLinkActive,
    ],
    providers: [
      { provide: ScreenService, useValue: { observerBreakpoints: () => ({ pipe: vi.fn() }) } },
      { provide: FaIconLibrary, useValue: { addIcons: vi.fn() } },
      provideRouter([]),
    ],
  });

  const screenService = TestBed.inject(ScreenService);

  return {
    ...renderResult,
    component: renderResult.fixture.componentInstance,
    screenService,
  };
};
