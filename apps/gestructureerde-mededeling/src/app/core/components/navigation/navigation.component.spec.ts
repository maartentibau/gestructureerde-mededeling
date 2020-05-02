import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';
import { MaterialModule } from '../../material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScreenService } from '../../services/screen.service';

describe('NavigationComponent', () => {
  let component: NavigationComponent;
  let fixture: ComponentFixture<NavigationComponent>;

  let breakPointObserver: BreakpointObserver;
  let breakPointStream$: BehaviorSubject<BreakpointState>;
  let navigationCount: number;
  let navigationKeys: string[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MaterialModule, FontAwesomeModule],
      declarations: [NavigationComponent],
      providers: [BreakpointObserver, ScreenService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationComponent);
    component = fixture.componentInstance;
    breakPointObserver = TestBed.inject(BreakpointObserver);
  });

  it('should create', () => {
    // act
    fixture.detectChanges();

    // assert
    expect(component).toBeTruthy();
    expect(fixture).toMatchSnapshot();
  });
});
