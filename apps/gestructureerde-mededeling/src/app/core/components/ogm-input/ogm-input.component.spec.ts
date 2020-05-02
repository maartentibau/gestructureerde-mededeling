import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OgmInputComponent } from './ogm-input.component';
import { OgmService } from '../../services/ogm.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('OgmInputComponent', () => {
  let component: OgmInputComponent;
  let fixture: ComponentFixture<OgmInputComponent>;
  let omgService: OgmService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [OgmInputComponent],
      providers: [OgmService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OgmInputComponent);
    component = fixture.componentInstance;
    omgService = TestBed.inject(OgmService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('rendering component', () => {
    it('should match snapshot with no @Input properties defined', () => {
      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });

    it('should match snapshot with validate set to false', () => {
      // prepare
      component.validate = false;
      component.placeholderMessage = 'Placeholder message';

      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });

    it('should match snapshot with validate set to true', () => {
      // prepare
      component.validate = true;
      component.placeholderMessage = 'Placeholder message';

      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });
  });

  describe('ngOnInit', () => {
    it('should call the init method of the ogmService', () => {
      // prepare
      jest.spyOn(omgService, 'init');

      // act
      component.ngOnInit();

      // check
      expect(omgService.init).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should call next method on destroy$', () => {
      // prepare
      jest.spyOn(component.destroy$, 'next');

      // act
      component.ngOnDestroy();

      // check
      expect(component.destroy$.next).toHaveBeenCalledWith();
    });
  });

  describe('ogmInputChange', () => {
    describe('without validation', () => {});

    describe('with validation', () => {});
  });
});
