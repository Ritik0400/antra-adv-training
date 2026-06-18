import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';

import { StarWarService } from './star-war';

describe('StarWarService', () => {
  let service: StarWarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });

    service = TestBed.inject(StarWarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});