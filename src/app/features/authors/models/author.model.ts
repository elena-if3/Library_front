import { Author } from '../form/interfaces/author.interface';

export class AuthorModel implements Author {
  id: number = 0;
  firstname: string = '';
  lastname: string = '';
  birthdate: Date = new Date('1900-01-01');
}
