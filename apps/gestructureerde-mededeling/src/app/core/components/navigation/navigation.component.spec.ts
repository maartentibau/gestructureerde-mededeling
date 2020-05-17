import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_NAVIGATION, NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Breakpoints } from '@angular/cdk/layout';
import { MaterialModule } from '../../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScreenService } from '../../services/screen.service';
import { TestScheduler } from 'rxjs/testing';
import { NavigationEntity, NavigationLabel } from './navigation.model';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  let screenService: ScreenService;
  let testScheduler: TestScheduler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, FontAwesomeModule],
      declarations: [NavigationComponent],
      providers: [ScreenService],
    }).compileComponents();
  }));

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
