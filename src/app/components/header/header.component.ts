import { Component, signal, OnInit  } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';


import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';


@Component({
  selector: 'app-header',
  imports: [ToolbarModule, ButtonModule, MenubarModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class Header implements OnInit{

  items: MenuItem[] = [];

  ngOnInit() {
    this.items = [
      { label: 'Início', routerLink: ['/'] },
      { label: 'Ações', routerLink: ['/acoes'] },
      { label: 'Criar Ação', routerLink: ['/criar-acao'] },
      { label: 'Sobre', routerLink: ['/sobre'] }
    ];
  }
}