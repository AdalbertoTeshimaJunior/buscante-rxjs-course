import { BookService } from './../../service/book.service';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy {

  listBooks: [];
  searchField: string = '';
  subscription: Subscription;

  constructor(private service: BookService) { }

  fetchBooks() {
    this.subscription = this.service.fetch(this.searchField).subscribe({
      next: APIreturn => console.log(APIreturn),
      error: error => console.error(error),
      complete: () => console.log("Completed"),
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}



