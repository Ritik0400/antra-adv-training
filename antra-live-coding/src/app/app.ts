import { Component } from '@angular/core';
import { JobBoard } from './components/job-board/job-board';

@Component({
  selector: 'app-root',
  imports: [JobBoard],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}