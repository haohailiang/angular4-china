import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Hero } from './hero.model';
import { HEROES } from '../mock/mock-heroes';
import { MessageService } from '../messages/message.service';

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('从服务器获取服务');
    return of(HEROES);
  }
}
