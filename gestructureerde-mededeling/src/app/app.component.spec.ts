import { JsonPipe, NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { RouterTestingModule } from '@angular/router/testing';
import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { AppComponent } from './app.component';

@Component({
  standalone: true,
  selector: 'ogm-navigation',
  template: '',
})
class MockNavigationComponent {}

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'fa-icon',
  template: ` <div>{{ icon | json }}</div> `,
})
class MockFaIconComponent {
  @Input() icon: string | string[] | undefined;
}

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: FaConfig, useValue: { fixedWidth: null } },
        { provide: FaIconLibrary, useValue: { addIcons: jest.fn() } },
      ],
    })
      .overrideComponent(AppComponent, {
        set: { imports: [MockNavigationComponent, RouterTestingModule, MatCardModule, MockFaIconComponent, NgStyle] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering component', () => {
    it('should match snapshot', () => {
      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });
  });
});
