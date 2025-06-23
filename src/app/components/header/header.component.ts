import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class Header {
  // sinal que mantém o estado do menu com as opções e o item selecionado
  menus = signal<any[]>([
    {
      label: 'Início',
      route: 'inicio',
      selected: true,
    },
    {
      label: 'Ações',
      route: 'acoes',
      selected: false,
    },
    {
      label: 'Criar Ações',
      route: 'divulgar',
      selected: false,
    },
    {
      label: 'Sobre',
      route: 'sobre',
      selected: false,
    },
  ]);

  // guarda o nome da seção atualmente selecionada
  selected: string = 'inicio';

  // método que atualiza a seção selecionada e faz o scroll suave para o elemento
  selectMenu(section: string) {
    this.selected = section;
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
