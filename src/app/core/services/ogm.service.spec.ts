import { TestBed } from '@angular/core/testing';

import { OgmService } from './ogm.service';

describe('OgmService', () => {
  let service: OgmService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OgmService],
    });

    service = TestBed.inject(OgmService);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('init', () => {
    it('should generate an empty OGM', () => {
      // prepare
      jest.spyOn(service, 'format');
      const emptyString12Spaces = '            ';
      const expectedResult = '+++   /    /     +++';

      // act
      const result = service.init();

      // check
      expect(service.format).toHaveBeenCalledWith(emptyString12Spaces);
      expect(result).toBe(expectedResult);
    });
  });

  describe('generate', () => {
    describe('random OGM', () => {
      beforeEach(() => {
        jest.spyOn(service, 'generateRandomOgm').mockReturnValueOnce('0000000097');
      });

      it('should generate a full formatted valid random OGM', () => {
        // prepare
        const expectedResult = '+++000/0000/09797+++';

        // act
        const result = service.generate('', true);

        // check
        expect(service.generateRandomOgm).toHaveBeenCalled();
        expect(result).toBe(expectedResult);
      });

      it('should generate a full valid random OGM number', () => {
        // prepare
        const expectedResult = '000000009797';

        // act
        const result = service.generate('', false);

        // check
        expect(service.generateRandomOgm).toHaveBeenCalled();
        expect(result).toBe(expectedResult);
      });
    });

    describe('OGM with a starting input', () => {
      beforeEach(() => {
        jest.spyOn(service, 'generateRandomOgm');
      });

      it('should generate a full formatted valid random OGM', () => {
        // prepare
        const expectedResult = '+++123/4560/00066+++';

        // act
        const result = service.generate('123456', true);

        // check
        expect(service.generateRandomOgm).not.toHaveBeenCalled();
        expect(result).toBe(expectedResult);
      });

      it('should generate a full valid random OGM number', () => {
        // prepare
        const expectedResult = '654321000019';

        // act
        const result = service.generate('654321', false);

        // check
        expect(service.generateRandomOgm).not.toHaveBeenCalled();
        expect(result).toBe(expectedResult);
      });
    });
  });

  describe('format', () => {
    it('it should correctly format a number to a OGM', () => {
      // prepare
      const ogmNumber = '123456789012';
      const expectedResult = '+++123/4567/89012+++';

      // act
      const result = service.format(ogmNumber);

      // check
      expect(result).toBe(expectedResult);
    });
  });

  describe('validate', () => {
    it('should return TRUE when the OGM is valid', () => {
      // prepare
      const validOgm = '+++123/4560/00066+++';

      // act & check
      expect(service.validate(validOgm)).toBeTruthy();
    });

    it('should return FALSE when the OGM is invalid', () => {
      // prepare
      const invalidOgm = '+++123/4567/89012+++';

      // act & check
      expect(service.validate(invalidOgm)).toBeFalsy();
    });
  });

  describe('clean', () => {
    it('should remove all spaces and none numeric characters', () => {
      // prepare
      const ogmWithInvalidCharacters = 'a1c2k.,?l@bsc3  4p(5';
      const expectedResult = '12345';

      // act
      const result = service.clean(ogmWithInvalidCharacters);

      // act & check
      expect(result).toBe(expectedResult);
    });
  });

  describe('generateRandomOgm', () => {
    it('should generate a random OGM number', () => {
      // prepare
      jest.spyOn(service, 'generateRandomNumber').mockReturnValue(1);
      const expectedResult = '1111111111';

      // act
      const result = service.generateRandomOgm();

      // act & check
      expect(result).toBe(expectedResult);
    });
  });

  describe('generateRandomNumber', () => {
    it('should generate a random OGM number', () => {
      // prepare
      jest.spyOn(Math, 'random').mockReturnValueOnce(1);
      const expectedResult = 10;

      // act
      const result = service.generateRandomNumber();

      // act & check
      expect(result).toBe(expectedResult);
    });
  });
});
