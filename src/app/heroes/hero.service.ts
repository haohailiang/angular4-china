import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from './hero.model';
import { MessageService } from '../messages/message.service';

@Injectable()
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.log('从内存服务器中获取服务');
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(heroes => this.log(`相当于do可以查看内部的数据流${JSON.stringify(heroes)}`)),
      // catchError(this.handleError('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero> {
    // this.log(`获取ID号为${id}的英雄数据`);
    // return of(HEROES.find(hero => hero.id === id));
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.put(`${this.heroesUrl}/${hero.id}`, hero, httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`))
      // catchError(this.handleError<any>('updateHero'))
    );
  }

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post<Hero>(this.heroesUrl, hero, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      // catchError(this.handleError<Hero>('addHero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      // catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${ this.heroesUrl }/?name_like=${term}`).pipe(
      tap(_ => this.log(`found heroes matching "${term}"`)),
      // catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError(): void {

  }
}
