import { Livro } from './../../models/interfaces';
import { BookService } from './../../service/book.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listBooks: Livro[];
  searchField: string = '';
  subscription: Subscription;
  book: Livro;

  constructor(private service: BookService) { }

  fetchBooks() {
    this.subscription = this.service.fetch(this.searchField).subscribe({
      next: items => {
        this.listBooks = this.livrosResultadoParaLivros(items);
      },
      error: error => console.error(error),
    });
  }

  livrosResultadoParaLivros(items): Livro[] {
    const books: Livro[] = [];

    items.forEach(item => {
      books.push(this.book = {
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        publisher: item.volumeInfo?.publisher,
        publishedDate: item.volumeInfo?.publishedDate,
        description: item.volumeInfo?.description,
        previewLink: item.volumeInfo?.previewLink,
        thumbnail: item.volumeInfo?.imageLinks?.thumbnail,
      });
    });

    return books;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



