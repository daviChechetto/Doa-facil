import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-sobre',
  imports: [],
  templateUrl: './sobre.html',
  styleUrl: './sobre.css'
})
export class Sobre {
  countAction = signal(0);  
  countContribuildings = signal(0);  

  incrementCounterContribuildings() {
    this.countAction.set(this.countAction() + 1);
  }

  incrementCounterAction() {
    this.countContribuildings.set(this.countContribuildings() + 1);
  }
}
