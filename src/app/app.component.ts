import { Component } from '@angular/core';
import { Header } from './components/header/header.component';
import { Cadastro } from './components/cadastro/cadastro.component';
import { Acoes } from './components/acoes/acoes.component';
import { Sobre } from './components/sobre/sobre.component';
import { Footer } from './components/footer/footer.component';
import { Divulgar } from './components/divulgar/divulgar.component';

@Component({
  selector: 'app-root',
  imports: [Header, Cadastro, Acoes, Sobre, Footer, Divulgar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Doa-facil';
}
