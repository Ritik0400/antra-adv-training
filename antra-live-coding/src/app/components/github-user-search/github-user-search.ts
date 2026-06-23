import { Component, inject } from '@angular/core';
import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-user-search',
  imports: [ReactiveFormsModule],
  templateUrl: './github-user-search.html',
  styleUrl: './github-user-search.scss'
})
export class GithubUserSearch {
  private router = inject(Router);

  username = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9-]+$/)
    ]
  });

  search(): void {
    const value = this.username.value.trim();

    console.log('Search button clicked:', value);

    if (!value || this.username.invalid) {
      this.username.markAsTouched();
      return;
    }

    this.router.navigate(['/results'], {
      queryParams: { q: value }
    }).then(success => {
      console.log('Navigation successful:', success);
    });
  }
}