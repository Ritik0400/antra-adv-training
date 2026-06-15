import { Component } from '@angular/core';
import { JobBoard } from './components/job-board/job-board';
import { StarWarSearch } from './components/star-war-search/star-war-search';
import { MortgageCalculator } from './components/mortgage-calculator/mortgage-calculator';

@Component({
  selector: 'app-root',
  imports: [JobBoard, StarWarSearch,MortgageCalculator],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}