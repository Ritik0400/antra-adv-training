import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mortgage-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './mortgage-calculator.html',
  styleUrl: './mortgage-calculator.scss'
})
export class MortgageCalculator {
  loanAmount = new FormControl<number | null>(null);
  loanTerm = new FormControl<number | null>(null);
  interestRate = new FormControl<number | null>(null);

  monthlyPayment = signal<string>('');
  totalPayment = signal<string>('');
  totalInterest = signal<string>('');
  errorMessage = signal<string>('');

  calculateMortgage(): void {
    const principal = Number(this.loanAmount.value);
    const years = Number(this.loanTerm.value);
    const annualRate = Number(this.interestRate.value);

    this.errorMessage.set('');
    this.monthlyPayment.set('');
    this.totalPayment.set('');
    this.totalInterest.set('');

    if (
      this.loanAmount.value === null ||
      this.loanTerm.value === null ||
      this.interestRate.value === null ||
      isNaN(principal) ||
      isNaN(years) ||
      isNaN(annualRate)
    ) {
      this.errorMessage.set('Please enter numerical values in all fields.');
      return;
    }

    if (principal <= 0 || years <= 0 || annualRate < 0) {
      this.errorMessage.set('Please enter valid values.');
      return;
    }

    const monthlyInterestRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    let monthlyPaymentAmount: number;

    if (monthlyInterestRate === 0) {
      monthlyPaymentAmount = principal / numberOfPayments;
    } else {
      monthlyPaymentAmount =
        principal *
        (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
        (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }

    const totalPaymentAmount = monthlyPaymentAmount * numberOfPayments;
    const totalInterestAmount = totalPaymentAmount - principal;

    this.monthlyPayment.set(monthlyPaymentAmount.toFixed(2));
    this.totalPayment.set(totalPaymentAmount.toFixed(2));
    this.totalInterest.set(totalInterestAmount.toFixed(2));
  }
}