import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { forkJoin, map, Observable, of, switchMap } from 'rxjs';

export interface Person {
  name: string;
  films: string[];
}

export interface SwapiFilm {
  title: string;
  release_date: string;
}

export interface Film {
  title: string;
  year: string;
}

@Injectable({
  providedIn: 'root'
})
export class StarWarService {
  private http = inject(HttpClient);

  private baseUrl = 'https://swapi.info/api';

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(`${this.baseUrl}/people`);
  }

  getFilmsByCharacterName(characterName: string): Observable<Film[]> {
    return this.getPeople().pipe(
      switchMap((people) => {
        const searchName = characterName.trim().toLowerCase();

        const character = people.find((person) => {
          return person.name.toLowerCase() === searchName;
        });

        if (!character) {
          return of([]);
        }

        const filmRequests = character.films.map((filmUrl) => {
          return this.http.get<SwapiFilm>(filmUrl);
        });

        return forkJoin(filmRequests).pipe(
          map((films) => {
            return films.map((film) => {
              return {
                title: film.title,
                year: film.release_date.split('-')[0]
              };
            });
          })
        );
      })
    );
  }
}