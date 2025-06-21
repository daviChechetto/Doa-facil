// importa os módulos e dependências necessários para o componente
import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { DataShareService } from "../../data-share.service";

// define o componente cadastro como standalone
@Component({
  selector: "app-cadastro",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class Cadastro {
  // objeto que armazena os dados do formulário da ong
  ong = {
    nome: "",
    cnpj: "",
    dataFundacao: "",
    telefone: "",
    area: "",
    missoes: "",
    imagemCapa: "",
  };

  // lista de categorias disponíveis para seleção
  categorias = [
    "Alimentos",
    "Educação",
    "Saúde",
    "Animais",
    "Social",
    "Voluntariado",
  ];

  // indica se o formulário foi enviado com sucesso
  enviado = false;

  // injeta o roteador e o serviço de compartilhamento de dados
  constructor(
    private router: Router,
    private dataShareService: DataShareService
  ) {}

  // função chamada ao submeter o formulário
  enviarFormulario(form: NgForm) {
    if (form.valid) {
      console.log("Dados enviados:", this.ong);
      this.enviado = true;

      // cria uma nova ação com os dados fornecidos no formulário
      const novaAcao = {
        titulo: this.ong.nome,
        imagem: this.ong.imagemCapa,
        categoria: this.ong.area
          .toLowerCase()
          .normalize("NFD") // Decompõe caracteres acentuados em base + acento
          .replace(/[\u0300-\u036f]/g, ""),
        descricao: this.ong.missoes || "Sem descrição informada.",
      };

      // envia a nova ação personalizada para o serviço compartilhado
      this.dataShareService.adicionarAcaoPersonalizada(novaAcao);

      // redireciona o usuário para a página inicial após breve intervalo
      setTimeout(() => this.router.navigate(["/"]), 1500);
    } else {
      this.enviado = false;

      // marca os campos como tocados para exibir mensagens de erro
      this.marcarCamposComoTocados(form);
    }
  }

  // marca todos os controles do formulário como tocados para exibir validação
  private marcarCamposComoTocados(form: NgForm) {
    Object.values(form.controls).forEach((control) => {
      control.markAsTouched();
    });
  }
}
