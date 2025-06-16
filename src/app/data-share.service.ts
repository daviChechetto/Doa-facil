import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  // BehaviorSubject para manter o valor atual e emitir para novos inscritos
  private acoesCountSource = new BehaviorSubject<number>(0);

  // Observable que outros componentes podem se inscrever
  acoesCount$ = this.acoesCountSource.asObservable();

  constructor() { }

  /**
   * Atualiza o contador de ações e emite o novo valor para os inscritos.
   * @param count O novo valor do contador de ações.
   */
  updateAcoesCount(count: number) {
    this.acoesCountSource.next(count);
  }
}
