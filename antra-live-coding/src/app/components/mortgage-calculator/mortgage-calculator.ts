import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-mortgage-calculator',
  imports: [ReactiveFormsModule],
  templateUrl: './mortgage-calculator.html',
  styleUrl: './mortgage-calculator.scss'
})
export class MortgageCalculator {
  loanAmount = new FormControl('');
  interestRate = new FormControl('');
  loanTerm = new FormControl('');

  monthlyPayment = signal<number | null>(null);
  totalPayment = signal<number | null>(null);
  totalInterest = signal<number | null>(null);
  errorMessage = signal<string>('');

  calculateMortgage(): void {
    const principal = Number(this.loanAmount.value);
    const annualInterestRate = Number(this.interestRate.value);
    const loanTermYears = Number(this.loanTerm.value);

    this.errorMessage.set('');
    this.monthlyPayment.set(null);
    this.totalPayment.set(null);
    this.totalInterest.set(null);

    if (
      isNaN(principal) ||
      isNaN(annualInterestRate) ||
      isNaN(loanTermYears)
    ) {
      this.errorMessage.set('Please enter numerical values only.');
      return;
    }

    if (principal <= 0 || annualInterestRate < 0 || loanTermYears <= 0) {
      this.errorMessage.set('Please enter valid positive values.');
      return;
    }

    const numberOfPayments = loanTermYears * 12;
    const monthlyInterestRate = annualInterestRate / 100 / 12;

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

    this.monthlyPayment.set(this.roundToTwo(monthlyPaymentAmount));
    this.totalPayment.set(this.roundToTwo(totalPaymentAmount));
    this.totalInterest.set(this.roundToTwo(totalInterestAmount));
  }

  roundToTwo(amount: number): number {
    return Math.round(amount * 100) / 100;
  }
}