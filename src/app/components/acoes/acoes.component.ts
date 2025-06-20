import { Component, OnInit } from "@angular/core"; // Importe OnInit
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DataShareService } from "../../data-share.service.js"; // Importe o serviço
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-acoes",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: "./acoes.component.html",
  styleUrl: "./acoes.component.css",
})
export class Acoes implements OnInit {
  // Implemente OnInit
  modalAberto = false;
  formularioAberto = false;
  exibirQRCode = false;

  validacaoFormulario = false;
  validacaoInscricao = false;
  inscricaoAberta = false;

  modalTitulo = "";
  modalDescricao = "";
  modalImagem = "";

  dados = {
    nome: "",
    email: "",
    telefone: "",
  };

  participacoesEDoacoes: any[] = [];
  erros: { [key: string]: string } = {};

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

  constructor(private dataShareService: DataShareService) {} // Injete o serviço

  ngOnInit() {
    // Quando o componente Acoes for inicializado, envie o length do array para o serviço
    this.dataShareService.updateAcoesCount(this.acoes.length);
  }

  categoriaSelecionada: string = "";

  // Para exibir os cards filtrados
  get acoesFiltradas() {
    if (!this.categoriaSelecionada) {
      return this.acoes;
    }
    return this.acoes.filter(
      (acao) => acao.categoria === this.categoriaSelecionada
    );
  }

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
    this.dados = { nome: "", email: "", telefone: "" };
    this.erros = {}; // Limpa erros
    this.validacaoFormulario = false; // Reseta estado de sucesso
  }

  fecharFormulario() {
    this.formularioAberto = false;
    this.erros = {}; // Limpa erros
    this.validacaoFormulario = false; // Reseta estado de sucesso
  }

  abrirInscricao() {
    this.inscricaoAberta = true;
    this.modalAberto = false;
    this.dados = { nome: "", email: "", telefone: "" };
    this.erros = {}; // Limpa erros
    this.validacaoInscricao = false; // Reseta estado de sucesso
  }

  fecharInscricao() {
    this.inscricaoAberta = false;
    this.erros = {}; // Limpa erros
    this.validacaoInscricao = false; // Reseta estado de sucesso
  }

  emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  telefoneValido(telefone: string): boolean {
    // Remove qualquer coisa que não seja número
    const cleaned = telefone.replace(/\D/g, "");
    return cleaned.length === 10 || cleaned.length === 11;
  }

  validarFormulario() {
    this.erros = {};
    const { nome, email, telefone } = this.dados;

    if (!nome.trim()) {
      this.erros["nome"] = "Nome é obrigatório.";
    }

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

    if (Object.keys(this.erros).length === 0) {
      this.participacoesEDoacoes.push({ ...this.dados, tipo: "doacao" });
      this.validacaoFormulario = true;
      this.dados = { nome: "", email: "", telefone: "" };
    } else {
      this.validacaoFormulario = false;
    }
    console.log(this.participacoesEDoacoes);
  }

  validarInscricao() {
    this.erros = {};
    const { nome, email, telefone } = this.dados;

    if (!nome.trim()) {
      this.erros["nome"] = "Nome é obrigatório.";
    }

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

    if (Object.keys(this.erros).length === 0) {
      this.participacoesEDoacoes.push({ ...this.dados, tipo: "participacao" });
      this.validacaoInscricao = true;
      this.dados = { nome: "", email: "", telefone: "" };
    } else {
      this.validacaoInscricao = false;
    }
    console.log(this.participacoesEDoacoes);
  }
}
