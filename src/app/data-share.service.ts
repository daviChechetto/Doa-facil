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

  private localStorageKey = 'contribuintes';
  private customAcoesKey = 'acoesPersonalizadas';

  constructor() {
    this.loadContribuintesFromStorage();
  }

  updateAcoesCount(count: number) {
    this.acoesCountSource.next(count);
  }

  updateContribuintesCount(count: number) {
    this.contribuintesCountSource.next(count);
  }

  saveContribuintesToStorage(contribuintes: any[]) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(contribuintes));
      this.updateContribuintesCount(contribuintes.length);
    } catch (error) {
      console.error('erro ao salvar contribuintes no localStorage', error);
    }
  }

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

  adicionarAcaoPersonalizada(acao: { titulo: string; imagem: string; categoria: string; descricao: string }) {
    const existentes = this.carregarAcoesPersonalizadas();
    existentes.push(acao);
    localStorage.setItem(this.customAcoesKey, JSON.stringify(existentes));
    this.updateAcoesCount(existentes.length);
  }

  carregarAcoesPersonalizadas(): any[] {
    try {
      const salvas = localStorage.getItem(this.customAcoesKey);
      return salvas ? JSON.parse(salvas) : [];
    } catch (e) {
      console.error('Erro ao carregar ações personalizadas', e);
      return [];
    }
  }
}
