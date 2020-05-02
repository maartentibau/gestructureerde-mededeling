import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberComponent } from './number.component';
import { StringToArrayPipe } from '../../string-to-array.pipe';
import { MaterialModule } from '../../material.module';

describe('NumberComponent', () => {
  let component: NumberComponent;
  let fixture: ComponentFixture<NumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [NumberComponent, StringToArrayPipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberComponent);
    component = fixture.componentInstance;
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

    it('should match snapshot with isValid set to false', () => {
      // prepare
      component.isValid = false;
      component.ogm = '+++123/4567/89012+++';

      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });

    it('should match snapshot with isValid set to true', () => {
      // prepare
      component.isValid = true;
      component.ogm = '+++123/4567/89012+++';

      // act
      fixture.detectChanges();

      // check
      expect(fixture).toMatchSnapshot();
    });
  });
});
