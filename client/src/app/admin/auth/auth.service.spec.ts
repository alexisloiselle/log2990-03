import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
  describe('connect()', () => {

    it('should return ', () => {
        expect(null).toEqual(null);
    });
  });
describe('changePassword()', () => {

    it('should return ', () => {
        expect(null).toEqual(null);
    });
  });
describe('disconnect()', () => {

    it('should return ', () => {
        expect(null).toEqual(null);
    });
  });
});



