import { TestBed } from '@angular/core/testing';

import { StarWar } from './star-war';

describe('StarWar', () => {
  let service: StarWar;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StarWar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
