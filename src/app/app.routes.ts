import { Routes } from '@angular/router';
import { Acoes } from "./components/acoes/acoes.component";
import { Sobre } from "./components/sobre/sobre.component";
import { Cadastro } from "./components/cadastro/cadastro.component";

export const routes: Routes = [
    {path: '', redirectTo:'inicio', pathMatch: 'full'},
    {path: 'acoes', component: Acoes},
    {path: 'sobre', component: Sobre},
    {path: 'cadastro', component: Cadastro}
];
