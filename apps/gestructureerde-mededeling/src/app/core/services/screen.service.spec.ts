import { TestBed } from '@angular/core/testing';

import { ScreenService } from './screen.service';

describe('ScreenService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScreenService = TestBed.inject(ScreenService);
    expect(service).toBeTruthy();
  });
});
