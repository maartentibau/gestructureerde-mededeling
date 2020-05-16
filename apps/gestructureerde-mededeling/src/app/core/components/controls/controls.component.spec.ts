import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsComponent } from './controls.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScreenService } from '../../services/screen.service';

describe('ControlsComponent', () => {
  let component: ControlsComponent;
  let fixture: ComponentFixture<ControlsComponent>;
  let screenService: ScreenService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [ControlsComponent],
      providers: [ScreenService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsComponent);
    component = fixture.componentInstance;

    screenService = TestBed.inject(ScreenService);
  });

  it('should create', () => {
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
