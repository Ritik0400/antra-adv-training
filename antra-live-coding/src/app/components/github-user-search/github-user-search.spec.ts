import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { GithubUserSearch } from './github-user-search';

describe('GithubUserSearch', () => {
  let component: GithubUserSearch;
  let fixture: ComponentFixture<GithubUserSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GithubUserSearch],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(GithubUserSearch);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});