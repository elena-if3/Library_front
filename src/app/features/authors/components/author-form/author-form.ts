import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthorFormFactory } from '../../form/authorForm.factory';
import { Author } from '../../form/interfaces/author.interface';
import { ReactiveFormsModule } from '@angular/forms';
import { isRequired, hasMinLengthError } from '../../../../core/tools/formValidator.validator';

@Component({
  selector: 'app-author-form',
  imports: [ReactiveFormsModule],
  templateUrl: './author-form.html',
  styleUrl: './author-form.scss',
})
export class AuthorForm implements OnInit, OnChanges {
  private readonly authorFormFactory = new AuthorFormFactory();
  public authorForm = this.authorFormFactory.createAuthorForm();
  public authorControls = this.authorForm.controls;

  @Input() author?: Author;
  @Output() authorFormChanged = new EventEmitter<Author>();

  ngOnInit() {
    console.log("Value of 'author':", this.author);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['author'] && changes['author'].currentValue) {
      this.authorForm.patchValue({ ...this.author });
    }
  }

  public submitForm() {
    if (this.authorForm.valid) {
      this.authorFormChanged.emit(this.authorForm.getRawValue());
    } else {
      this.authorForm.markAllAsTouched();
    }
  }

  protected readonly isRequired = isRequired;
  protected readonly hasMinLengthError = hasMinLengthError;
}
