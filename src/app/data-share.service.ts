// importa os módulos necessários do angular e rxjs
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// define o serviço como injetável no escopo raiz da aplicação
@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  // cria um observable para o contador de ações
  private acoesCountSource = new BehaviorSubject<number>(0);
  acoesCount$ = this.acoesCountSource.asObservable();

  // cria um observable para o contador de contribuintes
  private contribuintesCountSource = new BehaviorSubject<number>(0);
  contribuintesCount$ = this.contribuintesCountSource.asObservable();

  // chave para salvar os contribuintes no localstorage
  private localStorageKey = 'contribuintes';

  // chave para salvar as ações personalizadas no localstorage
  private customAcoesKey = 'acoesPersonalizadas';

  // construtor que carrega os contribuintes ao inicializar o serviço
  constructor() {
    this.loadContribuintesFromStorage();
  }

  // atualiza o valor do contador de ações
  updateAcoesCount(count: number) {
    this.acoesCountSource.next(count);
  }

  // atualiza o valor do contador de contribuintes
  updateContribuintesCount(count: number) {
    this.contribuintesCountSource.next(count);
  }

  // salva os contribuintes no localstorage e atualiza o contador
  saveContribuintesToStorage(contribuintes: any[]) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(contribuintes));
      this.updateContribuintesCount(contribuintes.length);
    } catch (error) {
      console.error('erro ao salvar contribuintes no localStorage', error);
    }
  }

  // carrega os contribuintes do localstorage e atualiza o contador
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

  // adiciona uma nova ação personalizada ao localstorage e atualiza o contador
  adicionarAcaoPersonalizada(acao: { titulo: string; imagem: string; categoria: string; descricao: string }) {
    const existentes = this.carregarAcoesPersonalizadas();
    existentes.push(acao);
    localStorage.setItem(this.customAcoesKey, JSON.stringify(existentes));
    this.updateAcoesCount(existentes.length);
  }

  // carrega todas as ações personalizadas do localstorage
  carregarAcoesPersonalizadas(): any[] {
    try {
      const salvas = localStorage.getItem(this.customAcoesKey);
      return salvas ? JSON.parse(salvas) : [];
    } catch (e) {
      console.error('erro ao carregar ações personalizadas', e);
      return [];
    }
  }
}
