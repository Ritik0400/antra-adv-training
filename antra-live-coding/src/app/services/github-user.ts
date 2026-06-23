import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface GitHubUser {
  id: number;
  login: string;
  html_url: string;
}

export interface GitHubUserSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubUser[];
}

@Injectable({
  providedIn: 'root'
})
export class GitHubUserService {
  private http = inject(HttpClient);

  private apiUrl = 'https://api.github.com/search/users';

  searchUsers(username: string): Observable<GitHubUserSearchResponse> {
    const params = new HttpParams().set('q', username);

    return this.http.get<GitHubUserSearchResponse>(
      this.apiUrl,
      { params }
    );
  }
}