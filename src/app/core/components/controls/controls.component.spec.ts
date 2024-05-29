import { AsyncPipe, JsonPipe, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { ScreenService } from '../../services/screen.service';

import { ControlsComponent } from './controls.component';

@Component({
  standalone: true,
  imports: [JsonPipe],
  selector: 'fa-icon',
  template: ` <div>{{ icon | json }}</div> `,
})
class MockFaIconComponent {
  @Input() icon: string | string[] | undefined;
}

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ControlsComponent],
      providers: [
        {
          provide: ScreenService,
          useValue: { observerBreakpoints: () => ({ pipe: jest.fn() }) },
        },
        { provide: FaIconLibrary, useValue: { addIcons: jest.fn() } },
      ],
    })
      .overrideComponent(ControlsComponent, {
        set: { imports: [NgIf, AsyncPipe, MatButtonModule, MockFaIconComponent] },
      })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering component', () => {
    it('should match snapshot', () => {
      // act
      fixture.detectChanges();

      // check
      // expect(fixture).toMatchSnapshot();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroy method', () => {
      // prepare
      jest.spyOn(component.clipboard, 'destroy');

      // act
      component.ngOnDestroy();

      // check
      expect(component.clipboard.destroy).toHaveBeenCalled();
    });
  });

  describe('refreshClickHandler', () => {
    it('should emit refreshClick', () => {
      // prepare
      jest.spyOn(component.refreshClick, 'emit');

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
      jest.spyOn(component.copyNumberClick, 'emit');

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
      jest.spyOn(component.copyOgmClick, 'emit');

      // act
      component.copyOgmClickHandler();

      // check
      expect(component.copyOgmClick.emit).toHaveBeenCalledWith(message);
    });
  });
});
