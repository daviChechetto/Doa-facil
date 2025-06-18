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
  countAction = signal(0);
  countContribuildings = signal(0);

  private acoesCountSubscription: Subscription | undefined;

  constructor(private dataShareService: DataShareService) { }

  ngOnInit() {
    this.acoesCountSubscription = this.dataShareService.acoesCount$.subscribe(count => {
      this.countAction.set(count);
    });
  }

  ngOnDestroy() {
    if (this.acoesCountSubscription) {
      this.acoesCountSubscription.unsubscribe();
    }
  }
}