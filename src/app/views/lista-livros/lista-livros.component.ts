import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { Livro, Item } from './../../models/interfaces';
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

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



