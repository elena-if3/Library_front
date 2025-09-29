import { Component, inject, OnInit } from '@angular/core';
import { AuthorFilters } from './components/author-filters/author-filters';
import { PageTitle } from '../../shared/components/page-title/page-title';
import { AuthorService } from './services/author.service';
import { Router } from '@angular/router';
import { handleError } from '../../core/tools/errorHandler';
import { AuthorModel } from './models/author.model';
import { AuthorFilter } from './form/interfaces/authorFilter.interface';

@Component({
  selector: 'app-authors',
  imports: [AuthorFilters, PageTitle],
  templateUrl: './authors.html',
  styleUrl: './authors.scss',
})
export class Authors implements OnInit {
  private authorService = inject(AuthorService);
  private router = inject(Router);
  public authorList: AuthorModel[] | undefined = [];
  public error: string = '';

  async ngOnInit() {
    this.getAllAuthors();
  }

  private async getAllAuthors() {
    const response = await this.authorService.getAll().catch(handleError);

    if (response) this.authorList = response;
    else this.error = 'Problem while retrieving the authors...';
  }

  async getFilteredAuthors(filters: AuthorFilter) {
    const response = await this.authorService.getFiltered(filters);

    if (response) this.authorList = response;
    else this.error = 'Problem while filtering the authors...';
  }

  public edit(id: number) {
    this.router.navigate([`/authors/edit/${id}`]);
  }

  public view(id: number) {
    this.router.navigate([`/authors`, id]);
  }

  public async delete(id: number) {
    try {
      await this.authorService.delete(id);
      await this.getAllAuthors();
    } catch (error) {
      this.error = 'An error has occurred...';
    }
  }
}
