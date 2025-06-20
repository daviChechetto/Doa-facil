import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DataShareService } from "../../data-share.service.js";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-acoes",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: "./acoes.component.html",
  styleUrl: "./acoes.component.css",
})
export class Acoes implements OnInit {
  // estado dos modais
  modalAberto = false;
  formularioAberto = false;
  inscricaoAberta = false;

  // estados de validacao
  validacaoFormulario = false;
  validacaoInscricao = false;

  // dados do modal
  modalTitulo = "";
  modalDescricao = "";
  modalImagem = "";

  // dados do formulário
  dados = {
    nome: "",
    email: "",
    telefone: "",
  };

  // array com doações e participações
  participacoesEDoacoes: any[] = [];

  // erros de validação por campo
  erros: { [key: string]: string } = {};

  // lista inicial de ações disponíveis
  acoes = [
    {
      titulo: "Limpe a Cidade",
      imagem:
        "https://pmc.criciuma.sc.gov.br/webroot/upload/Criciuma_Quem_Ama_Cuida_Arquivo_Decom.jpeg",
      categoria: "social",
      descricao: "Participe de mutirões para manter a cidade limpa.",
    },
    {
      titulo: "Cuide da Dengue",
      imagem:
        "https://pmc.criciuma.sc.gov.br/webroot/upload/30_Criciuma_segue_sem_casos_de_dengue_autoctone_mas_reforca_importancia_dos_cuidados.jpg",
      categoria: "saude",
      descricao: "Ajude a conscientizar sobre o combate à dengue.",
    },
    {
      titulo: "Ajude os Moradores de Rua",
      imagem:
        "https://pmc.criciuma.sc.gov.br/webroot/upload/Abordagem_Social_foto_Gregori_Flauzino.jpeg",
      categoria: "social",
      descricao:
        "Apoie ações de assistência social a pessoas em situação de rua.",
    },
    {
      titulo: "Doe para os Animais Abandonados",
      imagem:
        "https://pmc.criciuma.sc.gov.br/webroot/upload/WhatsApp_Image_2025_05_02_at_14_30_48.jpeg",
      categoria: "animais",
      descricao: "Contribua com ONGs de proteção animal.",
    },
    {
      titulo: "Doe Cestas Básicas",
      imagem:
        "https://pmc.criciuma.sc.gov.br/webroot/upload/WhatsApp_Image_2025_04_17_at_09_29_47.jpeg",
      categoria: "alimentos",
      descricao: "Ajude famílias em situação de vulnerabilidade alimentar.",
    },
    {
      titulo: "Seja Voluntário da Cruz Vermelha",
      imagem:
        "https://pmc.criciuma.sc.gov.br/webroot/upload/100_Toneladas_de_Solidariedade.jpeg",
      categoria: "voluntariado",
      descricao: "Participe de ações humanitárias como voluntário.",
    },
  ];

  // categoria de filtro selecionada
  categoriaSelecionada: string = "";

  constructor(private dataShareService: DataShareService) {}

  // ao inicializar atualiza contagem de ações
  ngOnInit() {
    this.dataShareService.updateAcoesCount(this.acoes.length);
  }

  // retorna as ações conforme o filtro
  get acoesFiltradas() {
    return this.categoriaSelecionada
      ? this.acoes.filter(
          (acao) => acao.categoria === this.categoriaSelecionada
        )
      : this.acoes;
  }

  // exibe modal de detalhes da ação
  abrirModal(acao: any) {
    this.modalTitulo = acao.titulo;
    this.modalDescricao = acao.descricao;
    this.modalImagem = acao.imagem;
    this.modalAberto = true;
  }

  // fecha modal de detalhes
  fecharModal() {
    this.modalAberto = false;
  }

  // abre formulário de doação
  abrirFormulario() {
    this.formularioAberto = true;
    this.modalAberto = false;
    this.resetarFormulario();
    this.validacaoFormulario = false;
  }

  // fecha formulário de doação
  fecharFormulario() {
    this.formularioAberto = false;
    this.erros = {};
    this.validacaoFormulario = false;
  }

  // abre formulário de inscrição
  abrirInscricao() {
    this.inscricaoAberta = true;
    this.modalAberto = false;
    this.resetarFormulario();
    this.validacaoInscricao = false;
  }

  // fecha formulário de inscrição
  fecharInscricao() {
    this.inscricaoAberta = false;
    this.erros = {};
    this.validacaoInscricao = false;
  }

  // função auxiliar para resetar os campos do formulário
  resetarFormulario() {
    this.dados = { nome: "", email: "", telefone: "" };
    this.erros = {};
  }

  // valida o formato do email
  emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // valida o formato do telefone
  telefoneValido(telefone: string): boolean {
    const cleaned = telefone.replace(/\D/g, "");
    return cleaned.length === 10 || cleaned.length === 11;
  }

  // valida e processa o formulário de doação
  validarFormulario() {
    this.validarCampos();

    if (Object.keys(this.erros).length === 0) {
      this.participacoesEDoacoes.push({ ...this.dados, tipo: "doacao" });
      this.dataShareService.updateContribuintesCount(
        this.participacoesEDoacoes.length
      );
      this.validacaoFormulario = true;
      this.resetarFormulario();
    } else {
      this.validacaoFormulario = false;
    }
  }

  // valida e processa o formulário de inscrição
  validarInscricao() {
    this.validarCampos();

    if (Object.keys(this.erros).length === 0) {
      this.participacoesEDoacoes.push({ ...this.dados, tipo: "participacao" });
      this.dataShareService.updateContribuintesCount(
        this.participacoesEDoacoes.length
      );
      this.validacaoInscricao = true;
      this.resetarFormulario();
    } else {
      this.validacaoInscricao = false;
    }
  }

  // valida os campos comuns dos formulários
  private validarCampos() {
    const { nome, email, telefone } = this.dados;
    this.erros = {};

    if (!nome.trim()) this.erros["nome"] = "Nome é obrigatório.";
    if (!email.trim()) {
      this.erros["email"] = "E-mail é obrigatório.";
    } else if (!this.emailValido(email)) {
      this.erros["email"] = "E-mail inválido.";
    }
    if (!telefone.trim()) {
      this.erros["telefone"] = "Telefone é obrigatório.";
    } else if (!this.telefoneValido(telefone)) {
      this.erros["telefone"] = "Telefone inválido.";
    }
  }
}
