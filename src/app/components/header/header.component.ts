import { Component, signal  } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';


import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-header',
  imports: [ToolbarModule, ButtonModule, MenubarModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class Header {
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
      route: 'cadastro',
      selected: false,
    },
    {
      label: 'Sobre',
      route: 'sobre',
      selected: false,
    },
  ]);

  selected: string = 'inicio';

  selectMenu(section: string) {
    this.selected = section;
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
  
}