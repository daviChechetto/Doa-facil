import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DataShareService } from "../../data-share.service";
import { InputTextModule } from "primeng/inputtext";

@Component({
  selector: "app-acoes",
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: "./acoes.component.html",
  styleUrl: "./acoes.component.css",
})
export class Acoes implements OnInit {
  // controle dos modais abertos
  modalAberto = false;
  formularioAberto = false;
  inscricaoAberta = false;

  // controle de validações dos formulários
  validacaoFormulario = false;
  validacaoInscricao = false;

  // dados do modal de exibição de detalhes
  modalTitulo = "";
  modalDescricao = "";
  modalImagem = "";

  // dados do formulário de doação e participação
  dados = {
    nome: "",
    email: "",
    telefone: "",
  };

  // lista de contribuições registradas
  contribuicoes: any[] = [];

  // objeto com mensagens de erro para validação de formulário
  erros: { [key: string]: string } = {};

  // lista completa de ações visíveis no componente
  acoes: any[] = [];

  // filtros de exibição
  categoriaSelecionada: string = "";
  acaoSelecionada: string = "";

  // injeta o serviço de compartilhamento de dados
  constructor(private dataShareService: DataShareService) {
    this.contribuicoes =
      this.dataShareService.loadContribuintesFromStorage() || [];
  }

  // inicializa o componente com ações fixas e personalizadas
  ngOnInit() {
    // ações fixas pré cadastradas
    const acoesFixas = [
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
        descricao: "Apoie ações de assistência social a pessoas em situação de rua.",
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

    // carrega ações cadastradas dinamicamente
    const acoesPersonalizadas = this.dataShareService.carregarAcoesPersonalizadas();

    // mescla ações fixas com personalizadas
    this.acoes = [...acoesFixas, ...acoesPersonalizadas];

    // atualiza contagem de ações no serviço
    this.dataShareService.updateAcoesCount(this.acoes.length);
  }

  // retorna ações filtradas pela categoria selecionada
  get acoesFiltradas() {
    return this.categoriaSelecionada
      ? this.acoes.filter((acao) => acao.categoria === this.categoriaSelecionada)
      : this.acoes;
  }

  // abre o modal de visualização de detalhes da ação
  abrirModal(acao: any) {
    this.modalTitulo = acao.titulo;
    this.modalDescricao = acao.descricao;
    this.modalImagem = acao.imagem;
    this.modalAberto = true;
  }

  // fecha o modal de visualização
  fecharModal() {
    this.modalAberto = false;
  }

  // abre o formulário de doação
  abrirFormulario(acao: any) {
    this.acaoSelecionada = acao.titulo;
    this.formularioAberto = true;
    this.modalAberto = false;
    this.resetarFormulario();
    this.validacaoFormulario = false;
  }

  // fecha o formulário de doação
  fecharFormulario() {
    this.formularioAberto = false;
    this.erros = {};
    this.validacaoFormulario = false;
  }

  // abre o formulário de participação
  abrirInscricao(acao: any) {
    this.acaoSelecionada = acao.titulo;
    this.inscricaoAberta = true;
    this.modalAberto = false;
    this.resetarFormulario();
    this.validacaoInscricao = false;
  }

  // fecha o formulário de participação
  fecharInscricao() {
    this.inscricaoAberta = false;
    this.erros = {};
    this.validacaoInscricao = false;
  }

  // reseta os dados e erros dos formulários
  resetarFormulario() {
    this.dados = { nome: "", email: "", telefone: "" };
    this.erros = {};
  }

  // valida formato do email com regex
  emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // valida formato e tamanho do telefone
  telefoneValido(telefone: string): boolean {
    const cleaned = telefone.replace(/\D/g, "");
    return cleaned.length === 10 || cleaned.length === 11;
  }

  // executa validação e salva dados de doação
  validarFormulario() {
    this.validarCampos();

    if (Object.keys(this.erros).length === 0) {
      this.contribuicoes.push({
        ...this.dados,
        tipo: "doacao",
        acao: this.acaoSelecionada,
      });
      this.dataShareService.saveContribuintesToStorage(this.contribuicoes);
      this.validacaoFormulario = true;
      this.resetarFormulario();
    } else {
      this.validacaoFormulario = false;
    }
  }

  // executa validação e salva dados de participação
  validarInscricao() {
    this.validarCampos();

    if (Object.keys(this.erros).length === 0) {
      this.contribuicoes.push({
        ...this.dados,
        tipo: "participacao",
        acao: this.acaoSelecionada,
      });
      this.dataShareService.saveContribuintesToStorage(this.contribuicoes);
      this.validacaoInscricao = true;
      this.resetarFormulario();
    } else {
      this.validacaoInscricao = false;
    }
  }

  // valida campos obrigatórios e atualiza mensagens de erro
  private validarCampos() {
    const { nome, email, telefone } = this.dados;
    this.erros = {};

    if (!nome.trim()) this.erros["nome"] = "Nome é obrigatório";
    if (!email.trim()) {
      this.erros["email"] = "E-mail é obrigatório";
    } else if (!this.emailValido(email)) {
      this.erros["email"] = "E-mail inválido";
    }

    if (!telefone.trim()) {
      this.erros["telefone"] = "Telefone é obrigatório";
    } else if (!this.telefoneValido(telefone)) {
      this.erros["telefone"] = "Telefone inválido";
    }
  }
}
