import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { GitHubUserService } from './github-user';

describe('GitHubUserService', () => {
  let service: GitHubUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient()]
    });

    service = TestBed.inject(GitHubUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});