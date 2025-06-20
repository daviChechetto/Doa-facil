import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from '../../data-share.service.js';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class Sobre implements OnInit, OnDestroy {
  // signal para armazenar a contagem de ações
  countAction = signal(0);

  // signal para armazenar a contagem de contribuintes
  countContribuildings = signal(0);

  // subscrição para atualizações da contagem de ações
  private acoesCountSubscription: Subscription | undefined;

  // subscrição para atualizações da contagem de contribuintes
  private contribuintesCountSubscription: Subscription | undefined;

  // injeção do serviço de compartilhamento de dados
  constructor(private dataShareService: DataShareService) {}

  // inicialização do componente onde são feitas as inscrições nos observables
  ngOnInit() {
    this.acoesCountSubscription = this.dataShareService.acoesCount$.subscribe(count => {
      this.countAction.set(count);
    });

    this.contribuintesCountSubscription = this.dataShareService.contribuintesCount$.subscribe(count => {
      this.countContribuildings.set(count);
    });
  }

  // limpeza das subscrições ao destruir o componente para evitar vazamento de memória
  ngOnDestroy() {
    this.acoesCountSubscription?.unsubscribe();
    this.contribuintesCountSubscription?.unsubscribe();
  }
}
