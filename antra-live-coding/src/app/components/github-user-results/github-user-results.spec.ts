import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserResults } from './github-user-results';

describe('GithubUserResults', () => {
  let component: GithubUserResults;
  let fixture: ComponentFixture<GithubUserResults>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUserResults],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubUserResults);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
