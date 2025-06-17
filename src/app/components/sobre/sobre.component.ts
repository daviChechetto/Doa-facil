import { Component, signal, OnInit, OnDestroy } from '@angular/core';
import { DataShareService } from '../../data-share.service'; // Removido .js - Angular resolverá
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common'; // Necessário para diretivas como ngIf, ngFor (embora não usadas aqui, é uma boa prática para standalone)

@Component({
  selector: 'app-sobre',
  standalone: true,
  imports: [
    CommonModule // Adicionado CommonModule para garantir que diretivas como *ngIf/ngFor funcionem se adicionadas
  ],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class Sobre implements OnInit, OnDestroy {
  countAction = signal(0);
  countContribuildings = signal(0);

  private acoesCountSubscription: Subscription | undefined;

  constructor(private dataShareService: DataShareService) { }

  ngOnInit() {
    // Inscreva-se para receber o count de ações do serviço
    this.acoesCountSubscription = this.dataShareService.acoesCount$.subscribe(count => {
      this.countAction.set(count); // Atualiza o signal countAction com o valor recebido
    });
  }

  ngOnDestroy() {
    // Cancele a inscrição para evitar vazamentos de memória
    if (this.acoesCountSubscription) {
      this.acoesCountSubscription.unsubscribe();
    }
  }

  // Método para incrementar o contador de contribuintes, chamado por um botão no template
  incrementCounterContribuildings() {
    this.countContribuildings.set(this.countContribuildings() + 1);
  }
}