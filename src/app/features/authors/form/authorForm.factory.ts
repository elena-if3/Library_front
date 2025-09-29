import { inject, Injectable } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { AuthorFilter } from './interfaces/authorFilter.interface';
import { Author } from './interfaces/author.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthorFormFactory {
  private fb: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public createAuthorFilterForm(data?: Partial<AuthorFilter>) {
    return this.fb.group({
      firstname: this.fb.control(data?.firstname, [Validators.minLength(2)]),
      lastname: this.fb.control(data?.lastname, [Validators.minLength(2)]),
      minBirthYear: this.fb.control(data?.minBirthYear, [Validators.pattern(/^\d{1,4}$/)]),
      maxBirthYear: this.fb.control(data?.maxBirthYear, [
        Validators.pattern(/^\d{1,4}$/),
        Validators.max(new Date().getFullYear()),
      ]),
    });
  }

  public createAuthorForm(data?: Partial<Author>) {
    return this.fb.group({
      firstname: this.fb.control(data?.firstname, [Validators.required, Validators.minLength(2)]),
      lastname: this.fb.control(data?.lastname, [Validators.required, Validators.minLength(2)]),
      birthdate: this.fb.control(data?.birthdate, [
        // validates date format yyyy-mm-dd with regular expression
        Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/),
      ]),
    });
  }
}
