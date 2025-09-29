import { Component, ElementRef, EventEmitter, inject, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorFormFactory } from '../../form/authorForm.factory';
import { AuthorFilter } from '../../form/interfaces/authorFilter.interface';

@Component({
  selector: 'app-author-filters',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './author-filters.html',
  styleUrl: './author-filters.scss',
})
export class AuthorFilters {
  private readonly authorFormFactory = inject(AuthorFormFactory);
  public authorFilterForm = this.authorFormFactory.createAuthorFilterForm();

  @ViewChild('authorFilters') authorFilters!: ElementRef;
  @Output() authorFilterChanged = new EventEmitter<AuthorFilter>();

  public submitForm() {
    if (this.authorFilterForm.valid) {
      this.authorFilterChanged.emit(this.authorFilterForm.getRawValue());
    }
  }
}
