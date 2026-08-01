import { cadastrar } from "../services/authService.js";
import { iniciarCamposSenha } from "../components/campoSenha.js";
import { criarGerenciadorEventos } from "../utils/eventos.js";
import { mostrarMensagem, obterMensagemErro } from "../utils/erros.js";

export function iniciarCadastro({ navegar }) {
  const eventos = criarGerenciadorEventos();
  const form = document.querySelector("#form-cadastro");
  const mensagem = document.querySelector("#mensagem-cadastro");
  const botao = form.querySelector("button[type='submit']");

  iniciarCamposSenha(eventos);

  eventos.ouvir(form, "submit", async (evento) => {
    evento.preventDefault();
    botao.disabled = true;

    try {
      await cadastrar(Object.fromEntries(new FormData(form)));
      mostrarMensagem(mensagem, "Cadastro realizado. Redirecionando...", true);
      setTimeout(() => navegar("/login"), 700);
    } catch (error) {
      mostrarMensagem(mensagem, obterMensagemErro(error));
    } finally {
      botao.disabled = false;
    }
  });

  return eventos.limpar;
}

