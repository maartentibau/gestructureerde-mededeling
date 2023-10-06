import { Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { TestScheduler } from 'rxjs/testing';
import { ScreenService } from '../../services/screen.service';
import { APP_NAVIGATION, NavigationComponent } from './navigation.component';
import { NavigationEntity, NavigationLabel } from './navigation.model';

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'fa-icon',
  template: ` <div>{{ icon | json }}</div> `,
})
class MockFaIconComponent {
  @Input() icon: string | string[] | undefined;
}

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  let screenService: ScreenService;
  let testScheduler: TestScheduler;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationComponent],
      providers: [
        {
          provide: ScreenService,
          useValue: { observerBreakpoints: () => ({ pipe: jest.fn() }) },
        },
        { provide: FaIconLibrary, useValue: { addIcons: jest.fn() } },
      ],
    })
      .overrideComponent(NavigationComponent, {
        set: {
          imports: [
            MatToolbarModule,
            RouterTestingModule,
            AsyncPipe,
            NgIf,
            NgFor,
            MatButtonModule,
            MockFaIconComponent,
          ],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    screenService = TestBed.inject(ScreenService);

    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    // act
    fixture.detectChanges();

    // assert
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
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
          jest.spyOn(screenService, 'observerBreakpoints').mockReturnValue(breakPoints$);

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
          jest.spyOn(screenService, 'observerBreakpoints').mockReturnValue(breakPoints$);

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
    [
      { breakpoint: Breakpoints.XSmall, title: 'OGM' },
      { breakpoint: Breakpoints.Small, title: 'Gestructureerde Mededeling' },
      { breakpoint: Breakpoints.Medium, title: 'Gestructureerde Mededeling' },
      { breakpoint: Breakpoints.Large, title: 'Gestructureerde Mededeling' },
      { breakpoint: Breakpoints.XLarge, title: 'Gestructureerde Mededeling' },
    ].forEach(({ breakpoint, title }) => {
      it(`should be ${title} when ${breakpoint}`, () => {
        testScheduler.run(({ cold, expectObservable }) => {
          // prepare
          const breakPoints$ = cold('a', { a: { [breakpoint]: true } });
          jest.spyOn(screenService, 'observerBreakpoints').mockReturnValue(breakPoints$);

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
});
