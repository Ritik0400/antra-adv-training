import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Job {
  by: string;
  id: number;
  score?: number;
  time: number;
  title: string;
  type: string;
  url?: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private http = inject(HttpClient);

  private jobIdsUrl = 'https://hacker-news.firebaseio.com/v0/jobstories.json';
  private jobDetailUrl = 'https://hacker-news.firebaseio.com/v0/item';

  getJobs(): Observable<number[]> {
    return this.http.get<number[]>(this.jobIdsUrl);
  }

  getJobDetail(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.jobDetailUrl}/${id}.json`);
  }
}