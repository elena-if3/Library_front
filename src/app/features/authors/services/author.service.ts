import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, map } from 'rxjs';
import { AuthorFilter } from '../form/interfaces/authorFilter.interface';
import { Author } from '../form/interfaces/author.interface';

const BASE_URL = environment.api_url;

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private readonly http = inject(HttpClient);

  getAll() {
    return firstValueFrom(this.http.get<any>(`${BASE_URL}/authors`).pipe(map((r) => r.data)));
  }

  getFiltered(filters: AuthorFilter) {
    const clearerFilter: Partial<AuthorFilter> = {};
    if (filters.firstname) {
      clearerFilter.firstname = filters.firstname;
    }
    if (filters.lastname) {
      clearerFilter.lastname = filters.lastname;
    }
    if (filters.minBirthYear) {
      clearerFilter.minBirthYear = filters.minBirthYear;
    }
    if (filters.maxBirthYear) {
      clearerFilter.maxBirthYear = filters.maxBirthYear;
    }
    return firstValueFrom(
      this.http.get<any>(`${BASE_URL}/authors`, { params: { ...clearerFilter } })
    );
  }

  getOneById(id: number) {
    return firstValueFrom(this.http.get<any>(`${BASE_URL}/authors/${id}`).pipe(map((r) => r.data)));
  }

  create(author: Author) {
    return firstValueFrom(this.http.post(`${BASE_URL}/authors/new`, author));
  }

  update(id: number, author: Author) {
    return firstValueFrom(this.http.put(`${BASE_URL}/authors/${id}`, author));
  }

  delete(id: number) {
    return firstValueFrom(this.http.delete(`${BASE_URL}/authors/${id}`));
  }
}
