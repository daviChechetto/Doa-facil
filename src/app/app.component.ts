import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header.component';
import { Acoes } from './components/acoes/acoes.component';
import { Sobre } from './components/sobre/sobre.component';
import { Footer } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Acoes, Sobre, Footer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Doa-facil';
}
