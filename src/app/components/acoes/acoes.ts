import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-acoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './acoes.html',
  styleUrl: './acoes.css'
})
export class Acoes {
  modalAberto = false;
  formularioAberto = false;
  exibirQRCode = false;

  modalTitulo = '';
  modalDescricao = '';
  modalImagem = '';

  dados = {
    nome: '',
    email: '',
    telefone: ''
  };

  acoes = [
    {
      titulo: 'Limpe a Cidade',
      imagem: 'https://pmc.criciuma.sc.gov.br/webroot/upload/Criciuma_Quem_Ama_Cuida_Arquivo_Decom.jpeg',
      categoria: 'social',
      descricao: 'Participe de mutirões para manter a cidade limpa.'
    },
    {
      titulo: 'Cuide da Dengue',
      imagem: 'https://pmc.criciuma.sc.gov.br/webroot/upload/30_Criciuma_segue_sem_casos_de_dengue_autoctone_mas_reforca_importancia_dos_cuidados.jpg',
      categoria: 'saude',
      descricao: 'Ajude a conscientizar sobre o combate à dengue.'
    },
    {
      titulo: 'Ajude os Moradores de Rua',
      imagem: 'https://pmc.criciuma.sc.gov.br/webroot/upload/Abordagem_Social_foto_Gregori_Flauzino.jpeg',
      categoria: 'social',
      descricao: 'Apoie ações de assistência social a pessoas em situação de rua.'
    },
    {
      titulo: 'Doe para os Animais Abandonados',
      imagem: 'https://pmc.criciuma.sc.gov.br/webroot/upload/WhatsApp_Image_2025_05_02_at_14_30_48.jpeg',
      categoria: 'animais',
      descricao: 'Contribua com ONGs de proteção animal.'
    },
    {
      titulo: 'Doe Cestas Básicas',
      imagem: 'https://pmc.criciuma.sc.gov.br/webroot/upload/WhatsApp_Image_2025_04_17_at_09_29_47.jpeg',
      categoria: 'alimentos',
      descricao: 'Ajude famílias em situação de vulnerabilidade alimentar.'
    },
    {
      titulo: 'Seja Voluntário da Cruz Vermelha',
      imagem: 'https://pmc.criciuma.sc.gov.br/webroot/upload/100_Toneladas_de_Solidariedade.jpeg',
      categoria: 'voluntariado',
      descricao: 'Participe de ações humanitárias como voluntário.'
    }
  ];

  abrirModal(acao: any) {
    this.modalTitulo = acao.titulo;
    this.modalDescricao = acao.descricao;
    this.modalImagem = acao.imagem;
    this.modalAberto = true;
  }

  fecharModal() {
    this.modalAberto = false;
  }

  abrirFormulario() {
    this.formularioAberto = true;
    this.modalAberto = false;
    this.exibirQRCode = false;
    this.dados = { nome: '', email: '', telefone: '' };
  }

  fecharFormulario() {
    this.formularioAberto = false;
  }

  fecharInscricao() {
    this.inscricaoAberta = false;
  }

  validarFormulario() {
    const { nome, email, telefone } = this.dados;
    if (nome.trim() && email.trim() && telefone.trim()) {
      this.validacaoFormulario = true;
    }
  }

  validarInscricao() {
    const { nome, email, telefone } = this.dados;
    if (nome.trim() && email.trim() && telefone.trim()) {
      this.validacaoFInscricao = true;
    }
  }
}