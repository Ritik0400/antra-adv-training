import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { UsernameValidationService } from '../../services/username-validation';

type ContactMethod = 'email' | 'phone';

interface RegistrationForm {
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  confirmPassword: FormControl<string>;
  phoneNumber: FormControl<string>;
  preferredContactMethod: FormControl<ContactMethod>;
}

@Component({
  selector: 'app-user-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './user-registration.html',
  styleUrl: './user-registration.scss'
})
export class UserRegistration {
  private usernameValidationService = inject(
    UsernameValidationService
  );

  successMessage = signal<string>('');

  registrationForm = new FormGroup<RegistrationForm>(
    {
      username: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(3)
        ],
        asyncValidators: [
          this.usernameValidationService.usernameTakenValidator()
        ],
        updateOn: 'blur'
      }),

      email: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.email
        ]
      }),

      password: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.minLength(6)
        ]
      }),

      confirmPassword: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),

      phoneNumber: new FormControl('', {
        nonNullable: true
      }),

      preferredContactMethod: new FormControl<ContactMethod>(
        'email',
        {
          nonNullable: true,
          validators: [Validators.required]
        }
      )
    },
    {
      validators: [
        this.passwordMatchValidator(),
        this.contactMethodValidator()
      ]
    }
  );

  constructor() {
    this.registrationForm.controls.preferredContactMethod
      .valueChanges
      .subscribe(method => {
        this.updateContactValidators(method);
      });

    this.updateContactValidators(
      this.registrationForm.controls.preferredContactMethod.value
    );
  }

  get username(): FormControl<string> {
    return this.registrationForm.controls.username;
  }

  get email(): FormControl<string> {
    return this.registrationForm.controls.email;
  }

  get password(): FormControl<string> {
    return this.registrationForm.controls.password;
  }

  get confirmPassword(): FormControl<string> {
    return this.registrationForm.controls.confirmPassword;
  }

  get phoneNumber(): FormControl<string> {
    return this.registrationForm.controls.phoneNumber;
  }

  get preferredContactMethod(): FormControl<ContactMethod> {
    return this.registrationForm.controls.preferredContactMethod;
  }

  onSubmit(): void {
    this.successMessage.set('');

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    console.log(
      'Registration form submitted:',
      this.registrationForm.getRawValue()
    );

    this.successMessage.set(
      'User registered successfully.'
    );

    this.registrationForm.reset({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      preferredContactMethod: 'email'
    });

    this.updateContactValidators('email');

    this.registrationForm.markAsPristine();
    this.registrationForm.markAsUntouched();
  }

  private updateContactValidators(
    method: ContactMethod
  ): void {
    if (method === 'phone') {
      this.phoneNumber.setValidators([
        Validators.required
      ]);

      this.email.setValidators([
        Validators.email
      ]);
    } else {
      this.email.setValidators([
        Validators.required,
        Validators.email
      ]);

      this.phoneNumber.clearValidators();
    }

    this.email.updateValueAndValidity({
      emitEvent: false
    });

    this.phoneNumber.updateValueAndValidity({
      emitEvent: false
    });

    this.registrationForm.updateValueAndValidity({
      emitEvent: false
    });
  }

  private passwordMatchValidator(): ValidatorFn {
    return (
      control: AbstractControl
    ): ValidationErrors | null => {
      const password =
        control.get('password')?.value;

      const confirmPassword =
        control.get('confirmPassword')?.value;

      if (!password || !confirmPassword) {
        return null;
      }

      return password === confirmPassword
        ? null
        : { passwordMismatch: true };
    };
  }

  private contactMethodValidator(): ValidatorFn {
    return (
      control: AbstractControl
    ): ValidationErrors | null => {
      const method =
        control.get('preferredContactMethod')?.value;

      const email =
        control.get('email')?.value?.trim();

      const phone =
        control.get('phoneNumber')?.value?.trim();

      if (method === 'email' && !email) {
        return { contactMethodMissing: true };
      }

      if (method === 'phone' && !phone) {
        return { contactMethodMissing: true };
      }

      return null;
    };
  }
}