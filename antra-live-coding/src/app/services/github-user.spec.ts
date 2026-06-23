import { TestBed } from '@angular/core/testing';

import { GithubUser } from './github-user';

describe('GithubUser', () => {
  let service: GithubUser;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GithubUser);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
