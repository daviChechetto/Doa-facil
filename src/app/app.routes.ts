import { Routes } from '@angular/router';
import { HomePage } from './pages/homepage/homepage.component';
import { Cadastro } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'cadastro', component: Cadastro }
];