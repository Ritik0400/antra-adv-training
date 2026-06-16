import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-flight-booker',
  imports: [ReactiveFormsModule],
  templateUrl: './flight-booker.html',
  styleUrl: './flight-booker.scss'
})
export class FlightBooker {
  flightType = new FormControl('one-way');
  departureDate = new FormControl('');
  returnDate = new FormControl('');

  errorMessage = signal<string>('');
  successMessage = signal<string>('');

  isReturnFlight(): boolean {
    return this.flightType.value === 'return';
  }

  bookFlight(): void {
    const type = this.flightType.value;
    const departure = this.departureDate.value || '';
    const returnValue = this.returnDate.value || '';

    this.errorMessage.set('');
    this.successMessage.set('');

    if (!departure) {
      this.errorMessage.set('Please select a departure date.');
      return;
    }

    if (this.isDateInPast(departure)) {
      this.errorMessage.set('Departure date cannot be in the past.');
      return;
    }

    if (type === 'return') {
      if (!returnValue) {
        this.errorMessage.set('Please select a return date.');
        return;
      }

      if (this.isDateInPast(returnValue)) {
        this.errorMessage.set('Return date cannot be in the past.');
        return;
      }

      if (returnValue < departure) {
        this.errorMessage.set('Return date cannot be before departure date.');
        return;
      }

      this.successMessage.set(
        `You have booked a return flight, departing on ${departure} and returning on ${returnValue}`
      );

      return;
    }

    this.successMessage.set(
      `You have booked a one-way flight on ${departure}`
    );
  }

  isDateInPast(dateValue: string): boolean {
    const selectedDate = new Date(dateValue);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return selectedDate < today;
  }
}