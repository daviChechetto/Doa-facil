import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  // behavior subject para armazenar o count de ações com valor inicial zero
  private acoesCountSource = new BehaviorSubject<number>(0)
  // observable público para emitir atualizações do count de ações
  acoesCount$ = this.acoesCountSource.asObservable()

  // behavior subject para armazenar o count de contribuintes com valor inicial zero
  private contribuintesCountSource = new BehaviorSubject<number>(0)
  // observable público para emitir atualizações do count de contribuintes
  contribuintesCount$ = this.contribuintesCountSource.asObservable()

  constructor() {}

  // atualiza o valor do count de ações e notifica os assinantes
  updateAcoesCount(count: number) {
    this.acoesCountSource.next(count)
  }

  // atualiza o valor do count de contribuintes e notifica os assinantes
  updateContribuintesCount(count: number) {
    this.contribuintesCountSource.next(count)
  }
}
