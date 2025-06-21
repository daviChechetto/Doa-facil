import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { DataShareService } from '../../data-share.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class Cadastro {
  ong = {
    nome: '',
    cnpj: '',
    dataFundacao: '',
    telefone: '',
    area: '',
    missoes: '',
    imagemCapa: ''
  };

  categorias = ['Saúde', 'Educação', 'Meio Ambiente', 'Social', 'Animais'];
  enviado = false;

  constructor(private router: Router, private dataShareService: DataShareService) {}

  enviarFormulario(form: NgForm) {
    if (form.valid) {
      console.log('Dados enviados:', this.ong);
      this.enviado = true;

      const novaAcao = {
        titulo: this.ong.nome,
        imagem: this.ong.imagemCapa,
        categoria: this.ong.area.toLowerCase(),
        descricao: this.ong.missoes || 'Sem descrição informada.'
      };

      this.dataShareService.adicionarAcaoPersonalizada(novaAcao);

      setTimeout(() => this.router.navigate(['/']), 1500);
    } else {
      this.enviado = false;
      this.marcarCamposComoTocados(form);
    }
  }

  private marcarCamposComoTocados(form: NgForm) {
    Object.values(form.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}
