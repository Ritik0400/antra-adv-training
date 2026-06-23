import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  GitHubUser,
  GitHubUserService
} from '../../services/github-user';

@Component({
  selector: 'app-github-user-results',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './github-user-results.html',
  styleUrl: './github-user-results.scss'
})
export class GithubUserResults {
  private route = inject(ActivatedRoute);
  private githubUserService = inject(GitHubUserService);

  users = signal<GitHubUser[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  searchedUsername = signal<string>('');

  filterControl = new FormControl('', {
    nonNullable: true
  });

  filterValue = signal<string>('');

  filteredUsers = computed(() => {
    const filter = this.filterValue().trim().toLowerCase();

    if (!filter) {
      return this.users();
    }

    return this.users().filter(user => {
      return (
        user.id.toString().includes(filter) ||
        user.login.toLowerCase().includes(filter) ||
        user.html_url.toLowerCase().includes(filter)
      );
    });
  });

  constructor() {
    this.filterControl.valueChanges.subscribe(value => {
      this.filterValue.set(value);
    });

    this.route.queryParamMap.subscribe(params => {
      const username = params.get('q')?.trim() || '';

      if (!username) {
        this.errorMessage.set('No username was provided.');
        return;
      }

      this.searchedUsername.set(username);
      this.loadUsers(username);
    });
  }

  private loadUsers(username: string): void {
    this.isLoading.set(true);
    this.errorMessage.set('');
    this.users.set([]);

    this.githubUserService.searchUsers(username).subscribe({
      next: response => {
        this.users.set(response.items);
        this.isLoading.set(false);
      },
      error: error => {
        console.error('GitHub user search failed:', error);
        this.errorMessage.set(
          'Unable to load GitHub users. Please try again.'
        );
        this.isLoading.set(false);
      }
    });
  }
}