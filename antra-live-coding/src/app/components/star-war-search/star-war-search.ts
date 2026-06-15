import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Film, StarWarService } from '../../services/star-war';

@Component({
  selector: 'app-star-war-search',
  imports: [ReactiveFormsModule],
  templateUrl: './star-war-search.html',
  styleUrl: './star-war-search.scss'
})
export class StarWarSearch {
  private starWarService = inject(StarWarService);

  characterName = new FormControl('');

  films = signal<Film[]>([]);
  isLoading = signal<boolean>(false);
  errorMessage = signal<string>('');
  searchedCharacter = signal<string>('');

  onSubmit(): void {
    const name = this.characterName.value?.trim() || '';

    console.log('Character name:', name);

    if (!name) {
      this.errorMessage.set('Please enter a Star Wars character name.');
      this.films.set([]);
      this.searchedCharacter.set('');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');
    this.films.set([]);
    this.searchedCharacter.set(name);

    this.starWarService.getFilmsByCharacterName(name).subscribe({
      next: (films) => {
        console.log('Films:', films);

        this.films.set(films);
        this.isLoading.set(false);

        if (films.length === 0) {
          this.errorMessage.set('No character found. Try a full name like Luke Skywalker.');
        }
      },
      error: (error) => {
        console.error('Error fetching films:', error);

        this.errorMessage.set('Failed to fetch films. Please try again.');
        this.isLoading.set(false);
      }
    });
  }
}