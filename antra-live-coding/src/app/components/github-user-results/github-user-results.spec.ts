import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ActivatedRoute,
  convertToParamMap
} from '@angular/router';
import { of } from 'rxjs';

import { GithubUserResults } from './github-user-results';
import { GitHubUserService } from '../../services/github-user';

describe('GithubUserResults', () => {
  let component: GithubUserResults;
  let fixture: ComponentFixture<GithubUserResults>;

  const githubUserServiceMock = {
    searchUsers: jasmine.createSpy('searchUsers').and.returnValue(
      of({
        total_count: 0,
        incomplete_results: false,
        items: []
      })
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUserResults],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of(
              convertToParamMap({ q: 'angular' })
            )
          }
        },
        {
          provide: GitHubUserService,
          useValue: githubUserServiceMock
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GithubUserResults);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});