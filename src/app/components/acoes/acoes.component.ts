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
  // variáveis que controlam a exibição dos modais
  modalAberto = false;
  formularioAberto = false;
  inscricaoAberta = false;

  // flags para indicar validação bem-sucedida dos formulários
  validacaoFormulario = false;
  validacaoInscricao = false;

  // dados do modal selecionado
  modalTitulo = "";
  modalDescricao = "";
  modalImagem = "";

  // dados do formulário
  dados = {
    nome: "",
    email: "",
    telefone: "",
  };

  // array que armazena as contribuições e participações
  contribuicoes: any[] = [];

  // objeto para armazenar mensagens de erro nos campos do formulário
  erros: { [key: string]: string } = {};

  // lista de ações disponíveis
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

  // categoria selecionada para filtro
  categoriaSelecionada: string = "";

  // ação selecionada para formulário
  acaoSelecionada: string = "";

  constructor(private dataShareService: DataShareService) {
    // carrega as contribuições salvas no storage ao inicializar
    this.contribuicoes =
      this.dataShareService.loadContribuintesFromStorage() || [];
  }

  ngOnInit() {
    // atualiza a contagem de ações no serviço de compartilhamento
    this.dataShareService.updateAcoesCount(this.acoes.length);
  }

  // retorna as ações filtradas pela categoria selecionada
  get acoesFiltradas() {
    return this.categoriaSelecionada
      ? this.acoes.filter((acao) => acao.categoria === this.categoriaSelecionada)
      : this.acoes;
  }

  // abre o modal com os detalhes da ação selecionada
  abrirModal(acao: any) {
    this.modalTitulo = acao.titulo;
    this.modalDescricao = acao.descricao;
    this.modalImagem = acao.imagem;
    this.modalAberto = true;
  }

  // fecha o modal de detalhes da ação
  fecharModal() {
    this.modalAberto = false;
  }

  // abre o formulário de doação associando a ação selecionada
  abrirFormulario(acao: any) {
    this.acaoSelecionada = acao.titulo;
    this.formularioAberto = true;
    this.modalAberto = false;
    this.resetarFormulario();
    this.validacaoFormulario = false;
  }

  // fecha o formulário de doação e reseta erros e validações
  fecharFormulario() {
    this.formularioAberto = false;
    this.erros = {};
    this.validacaoFormulario = false;
  }

  // abre o formulário de inscrição associando a ação selecionada
  abrirInscricao(acao: any) {
    this.acaoSelecionada = acao.titulo;
    this.inscricaoAberta = true;
    this.modalAberto = false;
    this.resetarFormulario();
    this.validacaoInscricao = false;
  }

  // fecha o formulário de inscrição e reseta erros e validações
  fecharInscricao() {
    this.inscricaoAberta = false;
    this.erros = {};
    this.validacaoInscricao = false;
  }

  // reseta os campos do formulário e os erros
  resetarFormulario() {
    this.dados = { nome: "", email: "", telefone: "" };
    this.erros = {};
  }

  // verifica se o email informado é válido
  emailValido(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // verifica se o telefone informado possui 10 ou 11 dígitos numéricos
  telefoneValido(telefone: string): boolean {
    const cleaned = telefone.replace(/\D/g, "");
    return cleaned.length === 10 || cleaned.length === 11;
  }

  // valida o formulário de doação, armazena dados e atualiza validação
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

  // valida o formulário de inscrição, armazena dados e atualiza validação
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

  // valida os campos nome email e telefone do formulário
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
