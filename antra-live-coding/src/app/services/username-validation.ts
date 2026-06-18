import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors
} from '@angular/forms';
import {
  catchError,
  map,
  Observable,
  of,
  switchMap,
  timer
} from 'rxjs';

interface PlaceholderUser {
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsernameValidationService {
  private http = inject(HttpClient);

  usernameTakenValidator(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ): Observable<ValidationErrors | null> => {
      const username = control.value?.trim();

      if (!username || username.length < 3) {
        return of(null);
      }

      return timer(500).pipe(
        switchMap(() =>
          this.http.get<PlaceholderUser[]>(
            'https://jsonplaceholder.typicode.com/users'
          )
        ),
        map(users => {
          const usernameTaken = users.some(
            user =>
              user.username.toLowerCase() === username.toLowerCase()
          );

          return usernameTaken
            ? { usernameTaken: true }
            : null;
        }),
        catchError(() => of(null))
      );
    };
  }
}