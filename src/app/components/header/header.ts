import { Component, signal } from '@angular/core';
/* import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button'; */

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

 menus = signal<any[]>(
  [
    {
      label: 'Dashboard',
      icon: 'pi pi-chart-bar',
      route: 'dashboard',
      selected: true,
    },
    {
      label: 'List',
      icon: 'pi pi-list',
      route: 'list',
      selected: false,
    },
    {
      label: 'Adicionar',
      icon: 'pi pi-plus-circle',
      route: 'add',
      selected: false,
    },
  ]);
}
