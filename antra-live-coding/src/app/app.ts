import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { JobBoard } from './components/job-board/job-board';
import { StarWarSearch } from './components/star-war-search/star-war-search';
import { MortgageCalculator } from './components/mortgage-calculator/mortgage-calculator';
import { FlightBooker } from './components/flight-booker/flight-booker';
import { UserRegistration } from './components/user-registration/user-registration';
import { UndoableCounter } from './components/undoable-counter/undoable-counter';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    JobBoard,
    StarWarSearch,
    MortgageCalculator,
    FlightBooker,
    UserRegistration,
    UndoableCounter
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}