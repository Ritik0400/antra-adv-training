import { TestBed } from '@angular/core/testing';

import { UsernameValidation } from './username-validation';

describe('UsernameValidation', () => {
  let service: UsernameValidation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameValidation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
