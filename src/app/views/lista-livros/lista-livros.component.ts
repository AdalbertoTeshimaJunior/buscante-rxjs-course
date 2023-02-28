import { LivroVolumeInfo } from './../../models/livroVolumeInfo';
import { Item } from './../../models/interfaces';
import { BookService } from './../../service/book.service';
import { Component } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, throwError } from 'rxjs';
import { FormControl } from '@angular/forms';

const pause = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  searchField = new FormControl();

  constructor(private service: BookService) { }

  booksFound$ = this.searchField.valueChanges
  .pipe(
    debounceTime(pause),
    filter((enteredValue) => enteredValue.length >= 3),
    distinctUntilChanged(),
    switchMap((enteredValue) => this.service.fetch(enteredValue)),
    map(items => this.livrosResultadoParaLivros(items)),
    catchError(erro => {
      return throwError(() => new Error('Erro!!!'))
    })
  )

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map(item => {
      return new LivroVolumeInfo(item);
    })
  }
}



