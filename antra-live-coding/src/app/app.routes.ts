import { Routes } from '@angular/router';
import { GithubUserSearch } from './components/github-user-search/github-user-search';
import { GithubUserResults } from './components/github-user-results/github-user-results';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full'
  },
  {
    path: 'search',
    component: GithubUserSearch
  },
  {
    path: 'results',
    component: GithubUserResults
  },
  {
    path: '**',
    redirectTo: 'search'
  }
];