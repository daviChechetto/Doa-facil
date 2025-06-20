import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  // comportamento que armazena e emite a contagem de ações
  private acoesCountSource = new BehaviorSubject<number>(0);
  acoesCount$ = this.acoesCountSource.asObservable();

  // comportamento que armazena e emite a contagem de contribuintes
  private contribuintesCountSource = new BehaviorSubject<number>(0);
  contribuintesCount$ = this.contribuintesCountSource.asObservable();

  // chave para armazenar dados no localStorage
  private localStorageKey = 'contribuintes';

  constructor() {
    // carrega contribuintes do localStorage ao inicializar o serviço
    this.loadContribuintesFromStorage();
  }

  // atualiza o valor da contagem de ações emitido pelo behavior subject
  updateAcoesCount(count: number) {
    this.acoesCountSource.next(count);
  }

  // atualiza o valor da contagem de contribuintes emitido pelo behavior subject
  updateContribuintesCount(count: number) {
    this.contribuintesCountSource.next(count);
  }

  // salva o array de contribuintes no localStorage e atualiza a contagem
  saveContribuintesToStorage(contribuintes: any[]) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(contribuintes));
      this.updateContribuintesCount(contribuintes.length);
    } catch (error) {
      console.error('erro ao salvar contribuintes no localStorage', error);
    }
  }

  // carrega o array de contribuintes do localStorage e atualiza a contagem
  loadContribuintesFromStorage() {
    try {
      const saved = localStorage.getItem(this.localStorageKey);
      if (saved) {
        const contribuintes = JSON.parse(saved);
        this.updateContribuintesCount(contribuintes.length);
        return contribuintes;
      }
    } catch (error) {
      console.error('erro ao carregar contribuintes do localStorage', error);
    }
    return [];
  }
}
