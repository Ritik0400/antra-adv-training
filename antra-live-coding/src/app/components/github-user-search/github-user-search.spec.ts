import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GithubUserSearch } from './github-user-search';

describe('GithubUserSearch', () => {
  let component: GithubUserSearch;
  let fixture: ComponentFixture<GithubUserSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUserSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(GithubUserSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
