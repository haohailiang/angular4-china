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

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  private handleError(): void {

  }
}
