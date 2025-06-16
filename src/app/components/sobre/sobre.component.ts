import { Component, signal, OnInit, OnDestroy } from '@angular/core'; // Importe OnInit e OnDestroy
import { DataShareService } from '../../data-share.service.js'; // Importe o serviço
import { Subscription } from 'rxjs'; // Importe Subscription

@Component({
  selector: 'app-sobre',
  standalone: true, // Certifique-se de que standalone está definido como true se for o caso
  imports: [],
  templateUrl: './sobre.component.html',
  styleUrl: './sobre.component.css'
})
export class Sobre implements OnInit, OnDestroy { // Implemente OnInit e OnDestroy
  countAction = signal(0);
  countContribuildings = signal(0); // Este permanece inalterado

  private acoesCountSubscription: Subscription | undefined; // Para gerenciar a inscrição

  constructor(private dataShareService: DataShareService) { } // Injete o serviço

  ngOnInit() {
    // Inscreva-se para receber o count de ações do serviço
    this.acoesCountSubscription = this.dataShareService.acoesCount$.subscribe(count => {
      this.countAction.set(count); // Atualiza o sinal countAction com o valor recebido
    });
  }

  ngOnDestroy() {
    // Cancele a inscrição para evitar vazamentos de memória
    if (this.acoesCountSubscription) {
      this.acoesCountSubscription.unsubscribe();
    }
  }

  // Os métodos incrementadores originais foram removidos para countAction,
  // pois ele agora é atualizado pelo serviço.
  // incrementCounterAction() foi renomeado e é para countContribuildings
  incrementCounterContribuildings() {
    this.countContribuildings.set(this.countContribuildings() + 1);
  }
}
