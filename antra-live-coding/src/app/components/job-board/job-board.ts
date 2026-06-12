import { Component, inject, OnInit, signal } from '@angular/core';
import { forkJoin, Observable, of, switchMap } from 'rxjs';
import { Job, JobService } from '../../services/job';

@Component({
  selector: 'app-job-board',
  imports: [],
  templateUrl: './job-board.html',
  styleUrl: './job-board.scss'
})
export class JobBoard implements OnInit {
  private jobService = inject(JobService);

  jobIds = signal<number[]>([]);
  jobs = signal<Job[]>([]);
  currentIndex = signal<number>(0);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');

  pageSize = 6;

  ngOnInit(): void {
    this.loadInitialJobs();
  }

  loadInitialJobs(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.jobService.getJobs().pipe(
      switchMap((ids) => {
        console.log('Job IDs:', ids);

        this.jobIds.set(ids);

        return this.getJobDetails(ids, 0);
      })
    ).subscribe({
      next: (jobs) => {
        console.log('Initial job details:', jobs);

        this.jobs.set(jobs);
        this.currentIndex.set(jobs.length);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load jobs.');
        this.isLoading.set(false);
        console.error('Error fetching jobs:', error);
      }
    });
  }

  loadMoreJobs(): void {
    this.isLoading.set(true);
    this.errorMessage.set('');

    const startIndex = this.currentIndex();

    this.getJobDetails(this.jobIds(), startIndex).subscribe({
      next: (newJobs) => {
        console.log('More job details:', newJobs);

        this.jobs.update((currentJobs) => [...currentJobs, ...newJobs]);
        this.currentIndex.set(startIndex + newJobs.length);
        this.isLoading.set(false);
      },
      error: (error) => {
        this.errorMessage.set('Failed to load more jobs.');
        this.isLoading.set(false);
        console.error('Error fetching more jobs:', error);
      }
    });
  }

  getJobDetails(ids: number[], startIndex: number): Observable<Job[]> {
    const nextSixIds = ids.slice(startIndex, startIndex + this.pageSize);

    if (nextSixIds.length === 0) {
      return of([]);
    }

    const jobRequests = nextSixIds.map((id) => {
      return this.jobService.getJobDetail(id);
    });

    return forkJoin(jobRequests);
  }

  hasMoreJobs(): boolean {
    return this.currentIndex() < this.jobIds().length;
  }

  formatDate(timestamp: number): string {
    return new Date(timestamp * 1000).toLocaleString();
  }
}