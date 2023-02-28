import { LivrosResultado, Item } from './../models/interfaces';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, map } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class BookService {

  private readonly API = 'https://www.googleapis.com/books/v1/volumes'
  constructor(private http: HttpClient) { }

  fetch(valueTyped: string): Observable<Item[]> {
      const params = new HttpParams().append('q', valueTyped)
      return this.http.get<LivrosResultado>(this.API, { params }).pipe(
        // tap(APIReturn => console.log(APIReturn)),
        map(result => result.items),
      );
  }
}
