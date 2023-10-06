import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ScreenService } from '../../core/services/screen.service';

import { MainComponent } from './main.component';

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'fa-icon',
  template: ` <div>{{ icon | json }}</div> `,
})
class MockFaIconComponent {
  @Input() icon: string | string[] | undefined;
}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainComponent],
      providers: [
        {
          provide: ScreenService,
          useValue: { observerBreakpoints: () => ({ pipe: jest.fn() }) },
        },
        { provide: FaIconLibrary, useValue: { addIcons: jest.fn() } },
      ],
    })
      .overrideComponent(MainComponent, {
        set: {
          imports: [NgIf, AsyncPipe, RouterTestingModule, MockFaIconComponent, MatButtonModule],
        },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
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
