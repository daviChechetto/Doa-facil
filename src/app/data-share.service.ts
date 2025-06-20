import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  private acoesCountSource = new BehaviorSubject<number>(0);
  acoesCount$ = this.acoesCountSource.asObservable();

  private contribuintesCountSource = new BehaviorSubject<number>(0);
  contribuintesCount$ = this.contribuintesCountSource.asObservable();

  constructor() { }

  updateAcoesCount(count: number) {
    this.acoesCountSource.next(count);
  }

  updateContribuintesCount(count: number) {
    this.contribuintesCountSource.next(count);
  }
}
