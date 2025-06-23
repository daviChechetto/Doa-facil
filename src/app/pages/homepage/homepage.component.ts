import { Component } from '@angular/core';
import { Header } from '../../components/header/header.component';
import { Acoes } from '../../components/acoes/acoes.component';
import { Sobre } from '../../components/sobre/sobre.component';
import { Footer } from '../../components/footer/footer.component';
import { Divulgar } from '../../components/divulgar/divulgar.component';

@Component({
  selector: 'app-homepage',
  imports: [Header, Acoes, Sobre, Footer, Divulgar],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomePage {

}