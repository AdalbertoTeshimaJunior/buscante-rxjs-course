import { BookService } from './../../service/book.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listBooks: [];
  searchField: string = '';

  constructor(private service: BookService) { }

  fetchBooks() {
    this.service.fetch(this.searchField).subscribe((APIreturn) => {

    });
  }

}



